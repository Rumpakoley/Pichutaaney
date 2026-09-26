export interface FormCustomQuestion {
  id: string;
  label: string;
  type: 'text' | 'yes_no' | 'dropdown';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  enabled: boolean;
}

export interface MenuVenueNotice {
  isActive: boolean;
  heading: string;
  note: string;
}

export interface CuratorDialogueItem {
  id: string;
  question: string;
  answer: string;
}

export interface DishImageItem {
  id: string;
  title: string;
  bengaliTitle: string;
  imageUrl: string;
  aspect?: string;
  objectPosition?: string;
}

export interface HearthVideoItem {
  id: string;
  url: string;
  poster: string;
  tag: string;
  title: string;
  quote: string;
  subtitle: string;
}

export interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  partySize: number;
  dietaryPreferences: string[];
  notes?: string;
  customAnswers?: Record<string, string>;
  submittedAt: string;
  status: 'pending' | 'shortlisted' | 'invited' | 'confirmed' | 'archived';
}

export interface PrivateEventInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: 'private_dinners' | 'brand_collaborations' | 'supper_club' | 'intimate_dinner' | 'celebration' | 'curated_gathering' | 'workshop' | 'other';
  guestCount: number;
  preferredDate: string;
  locationOrVenue: string;
  budgetOrFormat?: string;
  dietaryRestrictions: string;
  storytellingNotes: string;
  customAnswers?: Record<string, string>;
  submittedAt: string;
  status: 'new' | 'shortlisted' | 'in_discussion' | 'booked' | 'archived';
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
