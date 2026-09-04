import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { StoryOfPichhutaaney } from './components/StoryOfPichhutaaney';
import { SupperClubWaitlist } from './components/SupperClubWaitlist';
import { PrivateEvents } from './components/PrivateEvents';
import { KitchenDiaries } from './components/KitchenDiaries';
import { SampleMenu } from './components/SampleMenu';
import { GetInTouch } from './components/GetInTouch';
import { Footer } from './components/Footer';
import { HostLedgerModal } from './components/HostLedgerModal';
import { WaitlistEntry, PrivateEventInquiry, ContactMessage } from './types';

const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: 'PCH-WL-10821',
    fullName: 'Ananya Sengupta',
    email: 'ananya.sen@example.com',
    phone: '+1 (415) 555-0192',
    city: 'San Francisco, CA',
    partySize: 2,
    dietaryPreferences: ['Omnivore (Fish, Seafood & Meats)'],
    notes: 'Longing for authentic shorshe ilish and memories of my Dida’s kitchen in Salt Lake, Kolkata.',
    submittedAt: '2026-08-28T14:22:00.000Z',
    status: 'invited',
  },
  {
    id: 'PCH-WL-10844',
    fullName: 'Marcus Sterling',
    email: 'marcus.s@example.com',
    city: 'Oakland, CA',
    partySize: 2,
    dietaryPreferences: ['Pescatarian (River Fish, Seafood & Veg)', 'Gluten-Free'],
    notes: 'Heard about Enakshi’s regional culinary research on lesser-known spices like radhuni.',
    submittedAt: '2026-09-01T09:15:00.000Z',
    status: 'pending',
  }
];

const INITIAL_INQUIRIES: PrivateEventInquiry[] = [
  {
    id: 'PCH-EVT-20412',
    fullName: 'Dr. Priya & David Miller',
    email: 'priya.miller@example.org',
    phone: '+1 (510) 555-8391',
    eventType: 'celebration',
    guestCount: 14,
    preferredDate: 'Late October 2026 (Saturday evening)',
    locationOrVenue: 'Private home dining room, Berkeley Hills',
    dietaryRestrictions: '10 omnivores, 4 strict vegetarians (no gelatin/eggs)',
    storytellingNotes: 'Celebrating my mother’s 70th birthday. She grew up in Chandannagar and we would love a custom course reflecting French-Bengali colonial nuances.',
    submittedAt: '2026-09-02T16:40:00.000Z',
    status: 'in_discussion',
  }
];

export default function App() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem('pichhutaaney_waitlist');
      return saved ? JSON.parse(saved) : INITIAL_WAITLIST;
    } catch {
      return INITIAL_WAITLIST;
    }
  });

  const [inquiries, setInquiries] = useState<PrivateEventInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('pichhutaaney_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('pichhutaaney_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLedgerOpen, setIsLedgerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('pichhutaaney_waitlist', JSON.stringify(waitlist));
    } catch (e) {
      console.error(e);
    }
  }, [waitlist]);

  useEffect(() => {
    try {
      localStorage.setItem('pichhutaaney_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('pichhutaaney_messages', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  const handleAddWaitlist = (entry: WaitlistEntry) => {
    setWaitlist((prev) => [entry, ...prev]);
  };

  const handleAddInquiry = (inquiry: PrivateEventInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleAddMessage = (msg: ContactMessage) => {
    setMessages((prev) => [msg, ...prev]);
  };

  const handleUpdateWaitlistStatus = (id: string, status: WaitlistEntry['status']) => {
    setWaitlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleUpdateInquiryStatus = (id: string, status: PrivateEventInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#09090B] p-0 sm:p-3 md:p-4 lg:p-6 text-[#18181B] font-serif selection:bg-[#853724] selection:text-white antialiased">
      {/* Framed Geometric Canvas (Matches Template Screen & 1.png) */}
      <div className="min-h-full max-w-[1536px] mx-auto bg-[#FAFAF9] rounded-none sm:rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl flex flex-col border border-[#27272A]/30">
        {/* Navigation Header */}
        <Navbar
          onOpenLedger={() => setIsLedgerOpen(true)}
          waitlistCount={waitlist.length}
          inquiryCount={inquiries.length}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Section 1: About Me */}
          <AboutMe />

          {/* Section 2: The Story of Pichhutaaney */}
          <StoryOfPichhutaaney />

          {/* Section 3: Supper Club Waitlist */}
          <SupperClubWaitlist
            onAddEntry={handleAddWaitlist}
            existingEntriesCount={waitlist.length}
          />

          {/* Section 4: Private Events */}
          <PrivateEvents onAddInquiry={handleAddInquiry} />

          {/* Expansion: Kitchen Diaries & Lore */}
          <KitchenDiaries />

          {/* Expansion: Sample 6-Course Tasting Journey */}
          <SampleMenu />

          {/* Section 5: Get in Touch */}
          <GetInTouch onAddMessage={handleAddMessage} />
        </main>

        {/* Footer */}
        <Footer onOpenLedger={() => setIsLedgerOpen(true)} />
      </div>

      {/* Host Desk / Registry Modal */}
      <HostLedgerModal
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
        waitlist={waitlist}
        inquiries={inquiries}
        messages={messages}
        onUpdateWaitlistStatus={handleUpdateWaitlistStatus}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
      />
    </div>
  );
}
