import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  submittedAt: z.date().optional(),
});

export const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  team: z.string().min(1, 'Please select a team'),
  submittedAt: z.date().optional(),
});

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  details: z.string().min(10, 'Details must be at least 10 characters'),
  registeredAt: z.date().optional(),
});

export const eventRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+\s-]{10,}$/, 'Please enter a valid phone number'),
  sessionTime: z.enum(['morning', 'afternoon', 'evening']),
  timestamp: z.date().optional(),
});

export type ContactSubmission = z.infer<typeof contactSchema>;
export type VolunteerApplication = z.infer<typeof volunteerSchema>;
export type Registration = z.infer<typeof registrationSchema>;
export type EventRegistration = z.infer<typeof eventRegistrationSchema>;