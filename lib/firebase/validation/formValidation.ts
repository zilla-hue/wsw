import { z } from 'zod';
import { logger } from '../utils/logger';
import { FirebaseError } from 'firebase/app';

export interface ValidationResult {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
}

export const validateFormData = <T extends Record<string, any>>(
  data: T,
  schema: z.ZodSchema
): ValidationResult => {
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        const path = curr.path.join('.');
        acc[path] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return {
        success: false,
        errors,
        message: 'Please check the form for errors',
      };
    }
    
    return {
      success: false,
      message: 'An unexpected validation error occurred',
    };
  }
}

export const handleFirebaseError = (error: unknown): ValidationResult => {
  logger.error('Firebase operation failed:', error);

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'permission-denied':
        return {
          success: false,
          message: 'You do not have permission to perform this action',
        };
      case 'unavailable':
        return {
          success: false,
          message: 'The service is currently unavailable. Please try again later',
        };
      default:
        return {
          success: false,
          message: 'An error occurred while processing your request',
        };
    }
  }

  return {
    success: false,
    message: 'An unexpected error occurred',
  };
};