import { db } from './config';
import { collection } from 'firebase/firestore';

// Add the COLLECTIONS enum
export const COLLECTIONS = {
  CONTACT: 'contactSubmissions',
  EVENT_REGISTRATIONS: 'eventRegistrations',
  VOLUNTEER: 'volunteerApplications',
  REGISTRATION: 'registrations',
  USERS: 'users',
  EVENTS: 'events',
  DONATIONS: 'donations'
} as const;

// Collection references
export const volunteersRef = collection(db, COLLECTIONS.VOLUNTEER);
export const registrationsRef = collection(db, COLLECTIONS.REGISTRATION);
export const usersRef = collection(db, COLLECTIONS.USERS);
export const eventsRef = collection(db, COLLECTIONS.EVENTS);
export const donationsRef = collection(db, COLLECTIONS.DONATIONS);

// Collection types
export interface Volunteer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  team: string;
  createdAt: Date;
}

export interface Registration {
  id?: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface Donation {
  id?: string;
  userId: string;
  amount: number;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}