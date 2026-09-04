export interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  partySize: number;
  dietaryPreferences: string[];
  notes?: string;
  submittedAt: string;
  status: 'pending' | 'invited' | 'confirmed';
}

export interface PrivateEventInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: 'intimate_dinner' | 'celebration' | 'curated_gathering' | 'workshop' | 'other';
  guestCount: number;
  preferredDate: string;
  locationOrVenue: string;
  budgetOrFormat?: string;
  dietaryRestrictions: string;
  storytellingNotes: string;
  submittedAt: string;
  status: 'new' | 'in_discussion' | 'booked';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  purpose: 'collaboration' | 'partnership' | 'press' | 'idea' | 'say_hello';
  message: string;
  submittedAt: string;
}

export interface RegionalFlavourPillar {
  region: string;
  anchorIngredient: string;
  description: string;
  nuance: string;
}

export interface MenuCourse {
  courseNumber: string;
  courseTitle: string;
  bengaliName: string;
  description: string;
  heirloomElement: string;
  pairingNote?: string;
}
