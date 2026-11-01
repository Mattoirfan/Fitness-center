export type Role = 'member' | 'admin' | 'trainer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
  membershipStatus?: 'active' | 'inactive' | 'expired' | 'pending';
  activePlanId?: string;
  membershipExpiry?: string;
  joinedDate: string;
  fitnessGoal?: string;
  emergencyContact?: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  coordinates: { lat: number; lng: number };
  imagePlaceholderId: string;
}

export interface MembershipBenefit {
  text: string;
  included: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  priceINR: number;
  priceUSD: number;
  period: 'month' | 'year' | 'quarter';
  popular?: boolean;
  colorAccent?: string;
  description: string;
  accessHours: string;
  includedClassesPerMonth: number | 'Unlimited';
  guestPassesPerMonth: number;
  ptSessionsIncluded: number;
  saunaAccess: boolean;
  features: string[];
  exclusions: string[];
}

export interface GymClass {
  id: string;
  name: string;
  category: 'Strength' | 'HIIT' | 'Yoga' | 'Pilates' | 'Cycling' | 'Combat' | 'Conditioning';
  durationMinutes: number;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  caloriesBurnedEstimate: number;
  description: string;
  trainerId: string;
  trainerName: string;
  room: string;
  capacity: number;
  equipmentNeeded: string[];
  imagePlaceholderId: string;
}

export interface ClassScheduleItem {
  id: string;
  classId: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string; // e.g. "07:00 AM"
  trainerId: string;
  branchId: string;
  bookedCount: number;
  capacity: number;
  status: 'available' | 'full' | 'cancelled';
}

export interface ClassBooking {
  id: string;
  userId: string;
  scheduleId: string;
  className: string;
  dayOfWeek: string;
  time: string;
  trainerName: string;
  branchName: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'attended';
}

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialties: string[];
  bio: string;
  certifications: string[];
  experienceYears: number;
  languages: string[];
  sessionsCompleted: number;
  rating: number;
  philosophy: string;
  availability: string;
  imagePlaceholderId: string;
}

export interface Facility {
  id: string;
  name: string;
  category: 'Weights' | 'Cardio' | 'Functional' | 'Recovery' | 'Amenities';
  specs: string;
  description: string;
  equipmentHighlights: string[];
  highlight: string;
}

export interface FreeTrialLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  branchId: string;
  preferredDate: string;
  preferredTime: string;
  fitnessGoal: string;
  trainerPreference?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  passCode: string;
  createdAt: string;
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Strength' | 'Conditioning' | 'Nutrition' | 'Recovery' | 'Mindset';
  readTime: string;
  publishDate: string;
  authorName: string;
  authorRole: string;
  content: string[];
  keyTakeaways: string[];
}

export interface Order {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  currency: 'INR' | 'USD';
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  invoiceNumber: string;
  createdAt: string;
  taxAmount: number;
  discountAmount: number;
  promoCodeUsed?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Memberships' | 'Free Trials' | 'Classes & Bookings' | 'Facilities' | 'Personal Training' | 'Policies';
}

export interface AuditLogItem {
  id: string;
  action: string;
  performedBy: string;
  target: string;
  timestamp: string;
  details: string;
}
