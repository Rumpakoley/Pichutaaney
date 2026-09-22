import React, { useState, useEffect } from 'react';
import { UniqueNavbar } from './components/UniqueNavbar';
import { UniqueHero } from './components/UniqueHero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { UniqueManifestoBio } from './components/UniqueManifestoBio';
import { UniqueMenuExhibitions } from './components/UniqueMenuExhibitions';
import { UniqueKitchenHearthReels } from './components/UniqueKitchenHearthReels';
import { UniqueCulinaryTerroirs } from './components/UniqueCulinaryTerroirs';
import { UniqueCuratorDialogues } from './components/UniqueCuratorDialogues';
import { UniqueTableConcierge } from './components/UniqueTableConcierge';
import { UniqueFooter } from './components/UniqueFooter';
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#191512] font-sans selection:bg-[#963D28] selection:text-white antialiased">
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

        {/* Section 03: Tasting Menu Archive & Printed Editions Deck */}
        <UniqueMenuExhibitions />

        {/* Section 04: Living Hearth in Motion (6-Reel Studio & Acoustics) */}
        <UniqueKitchenHearthReels />

        {/* Section 05: The 4 Regional Terroirs & Geographical Anchors */}
        <UniqueCulinaryTerroirs />

        {/* Section 06: Curator Q&A Dialogues */}
        <UniqueCuratorDialogues />

        {/* Section 07: Direct Concierge & Table Reservation Deck */}
        <UniqueTableConcierge
          onAddWaitlist={handleAddWaitlist}
          onAddInquiry={handleAddInquiry}
          recentEntries={[...waitlist, ...inquiries]}
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
      />
    </div>
  );
}
