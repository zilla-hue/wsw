import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { contactSchema, volunteerSchema, registrationSchema } from '@/lib/firebase/schemas';
import { COLLECTIONS } from '@/lib/firebase/collections';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let validatedData;
    let collection;

    switch (type) {
      case 'contact':
        validatedData = contactSchema.parse(data);
        collection = COLLECTIONS.CONTACT;
        break;
      case 'volunteer':
        validatedData = volunteerSchema.parse(data);
        collection = COLLECTIONS.VOLUNTEER;
        break;
      case 'registration':
        validatedData = registrationSchema.parse(data);
        collection = COLLECTIONS.REGISTRATION;
        break;
      default:
        throw new Error('Invalid form type');
    }

    const submissionData = {
      ...validatedData,
      submittedAt: new Date(),
    };

    await adminDb.collection(collection).add(submissionData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Form submission failed' },
      { status: 500 }
    );
  }
}