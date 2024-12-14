import { useState, useCallback } from 'react';
import { validateFormData, ValidationResult } from '../validation/formValidation';
import { ZodSchema } from 'zod';
import { logger } from '../utils/logger';

interface UseFormValidationProps<T> {
  schema: ZodSchema;
  onSuccess?: (data: T) => void;
  onError?: (error: ValidationResult) => void;
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  onSuccess,
  onError,
}: UseFormValidationProps<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(
    (data: T): boolean => {
      const result = validateFormData(data, schema);

      if (!result.success) {
        setErrors(result.errors || {});
        onError?.(result);
        return false;
      }

      setErrors({});
      onSuccess?.(data);
      return true;
    },
    [schema, onSuccess, onError]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getFieldError = useCallback(
    (fieldName: keyof T) => errors[fieldName as string],
    [errors]
  );

  return {
    validateForm,
    clearErrors,
    getFieldError,
    errors,
  };
}