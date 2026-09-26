import React, { useState, useEffect } from 'react';
import { UniqueNavbar } from './components/UniqueNavbar';
import { UniqueHero } from './components/UniqueHero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { UniqueManifestoBio } from './components/UniqueManifestoBio';
import { UniqueDishesGallery } from './components/UniqueDishesGallery';
import { UniqueKitchenHearthReels } from './components/UniqueKitchenHearthReels';
import { UniqueCuratorDialogues } from './components/UniqueCuratorDialogues';
import { UniqueTableConcierge } from './components/UniqueTableConcierge';
import { UniqueFooter } from './components/UniqueFooter';
import { HostLedgerModal } from './components/HostLedgerModal';
import { UniqueCursor } from './components/UniqueCursor';
import { WaitlistEntry, PrivateEventInquiry, ContactMessage, FormCustomQuestion, MenuVenueNotice, CuratorDialogueItem } from './types';
import { DEFAULT_DIALOGUES } from './components/UniqueCuratorDialogues';
import { useScrollReveal } from './hooks/useScrollReveal';

const INITIAL_CUSTOM_QUESTIONS: FormCustomQuestion[] = [
  {
    id: 'q-spice',
    label: 'Spice Tolerance Preference',
    type: 'dropdown',
    options: ['Authentic Bengali (Bold & Pungent)', 'Balanced / Medium', 'Mild / Gentle'],
    required: false,
    enabled: true,
  },
  {
    id: 'q-celebration',
    label: 'Are you celebrating a special occasion or milestone?',
    type: 'yes_no',
    required: false,
    enabled: true,
  },
];

const INITIAL_MENU_NOTICE: MenuVenueNotice = {
  isActive: true,
  heading: 'Upcoming Supper Club & Intimate Batch Seating',
  note: 'Current Atelier Menu: 5-Course Heritage Fish & Heirloom Grains. BYOB welcome without corkage. Exact venue location dispatched upon confirmation.',
};

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

  const [customQuestions, setCustomQuestions] = useState<FormCustomQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('pichhutaaney_custom_questions');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_QUESTIONS;
    } catch {
      return INITIAL_CUSTOM_QUESTIONS;
    }
  });

  const [menuNotice, setMenuNotice] = useState<MenuVenueNotice>(() => {
    try {
      const saved = localStorage.getItem('pichhutaaney_menu_notice');
      return saved ? JSON.parse(saved) : INITIAL_MENU_NOTICE;
    } catch {
      return INITIAL_MENU_NOTICE;
    }
  });

  const [dialogues, setDialogues] = useState<CuratorDialogueItem[]>(() => {
    try {
      const saved = localStorage.getItem('pichhutaaney_dialogues');
      return saved ? JSON.parse(saved) : DEFAULT_DIALOGUES;
    } catch {
      return DEFAULT_DIALOGUES;
    }
  });

  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  useScrollReveal();

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

  useEffect(() => {
    try {
      localStorage.setItem('pichhutaaney_custom_questions', JSON.stringify(customQuestions));
    } catch (e) {
      console.error(e);
    }
  }, [customQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('pichhutaaney_menu_notice', JSON.stringify(menuNotice));
    } catch (e) {
      console.error(e);
    }
  }, [menuNotice]);

  useEffect(() => {
    try {
      localStorage.setItem('pichhutaaney_dialogues', JSON.stringify(dialogues));
    } catch (e) {
      console.error(e);
    }
  }, [dialogues]);

  const handleAddWaitlist = (entry: WaitlistEntry) => {
    setWaitlist((prev) => [entry, ...prev]);
  };

  const handleAddInquiry = (inquiry: PrivateEventInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
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
    <div className="min-h-screen bg-[#ECE5DA] text-[#28221D] font-sans selection:bg-[#B58D59] selection:text-white antialiased">
      {/* Bespoke Interactive Atelier Cursor */}
      <UniqueCursor />

      {/* Bespoke Floating Concierge Navigation */}
      <UniqueNavbar
        onOpenLedger={() => setIsLedgerOpen(true)}
        reservationCount={waitlist.length + inquiries.length}
      />

      <main className="w-full">
        {/* Section 01: Chef Atelier Signature Hero */}
        <UniqueHero />

        {/* Continuous Marquee Ticker */}
        <MarqueeBanner />

        {/* Section 02: Founder's Note & Culinary Manifesto */}
        <UniqueManifestoBio />

        {/* Section 03: Prepared Dishes Atelier Gallery */}
        <UniqueDishesGallery />

        {/* Section 04: Living Hearth in Motion */}
        <UniqueKitchenHearthReels />

        {/* Section 04: Curator Q&A Dialogues */}
        <UniqueCuratorDialogues dialogues={dialogues} />

        {/* Section 05: Direct Concierge & Table Reservation Deck */}
        <UniqueTableConcierge
          onAddWaitlist={handleAddWaitlist}
          onAddInquiry={handleAddInquiry}
          customQuestions={customQuestions}
          menuNotice={menuNotice}
        />
      </main>

      {/* Section 08: Bespoke Culinary Footer */}
      <UniqueFooter onOpenLedger={() => setIsLedgerOpen(true)} />

      {/* Host Desk / Registry Modal */}
      <HostLedgerModal
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
        waitlist={waitlist}
        inquiries={inquiries}
        messages={messages}
        onUpdateWaitlistStatus={handleUpdateWaitlistStatus}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        customQuestions={customQuestions}
        menuNotice={menuNotice}
        dialogues={dialogues}
        onUpdateCustomQuestions={setCustomQuestions}
        onUpdateMenuNotice={setMenuNotice}
        onUpdateDialogues={setDialogues}
      />
    </div>
  );
}

