'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { ZodSchema } from 'zod';
import toast from 'react-hot-toast';

interface UseSubmitFormProps {
  collectionName: string;
  schema: ZodSchema;
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useSubmitForm({ 
  collectionName, 
  schema, 
  onSuccess,
  successMessage = 'Submitted successfully!',
  errorMessage = 'Something went wrong. Please try again.'
}: UseSubmitFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: any) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate data
      const validatedData = schema.parse(data);

      // Add timestamp
      const dataWithTimestamp = {
        ...validatedData,
        timestamp: new Date(),
      };

      // Add to Firestore
      const collectionRef = collection(db, collectionName);
      await addDoc(collectionRef, dataWithTimestamp);

      // Show success message
      toast.success(successMessage);
      onSuccess?.();
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMsg = err instanceof Error ? err.message : errorMessage;
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitForm, isLoading, error };
}