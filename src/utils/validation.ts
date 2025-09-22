import { VALIDATION } from '@/constants/config';

/**
 * Validation utilities for form inputs and data
 */

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  username: (username: string): { isValid: boolean; error?: string } => {
    if (!username || username.trim().length === 0) {
      return { isValid: false, error: 'Tên người dùng không được để trống' };
    }
    
    if (username.length < VALIDATION.username.minLength) {
      return { isValid: false, error: `Tên người dùng phải có ít nhất ${VALIDATION.username.minLength} ký tự` };
    }
    
    if (username.length > VALIDATION.username.maxLength) {
      return { isValid: false, error: `Tên người dùng không được vượt quá ${VALIDATION.username.maxLength} ký tự` };
    }
    
    return { isValid: true };
  },

  password: (password: string): { isValid: boolean; error?: string } => {
    if (!password || password.trim().length === 0) {
      return { isValid: false, error: 'Mật khẩu không được để trống' };
    }
    
    if (password.length < VALIDATION.password.minLength) {
      return { isValid: false, error: `Mật khẩu phải có ít nhất ${VALIDATION.password.minLength} ký tự` };
    }
    
    if (password.length > VALIDATION.password.maxLength) {
      return { isValid: false, error: `Mật khẩu không được vượt quá ${VALIDATION.password.maxLength} ký tự` };
    }
    
    return { isValid: true };
  },

  profileName: (name: string): { isValid: boolean; error?: string } => {
    if (!name || name.trim().length === 0) {
      return { isValid: false, error: 'Tên hồ sơ không được để trống' };
    }
    
    if (name.length < VALIDATION.profileName.minLength) {
      return { isValid: false, error: `Tên hồ sơ phải có ít nhất ${VALIDATION.profileName.minLength} ký tự` };
    }
    
    if (name.length > VALIDATION.profileName.maxLength) {
      return { isValid: false, error: `Tên hồ sơ không được vượt quá ${VALIDATION.profileName.maxLength} ký tự` };
    }
    
    return { isValid: true };
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
};

/**
 * Form validation helper
 */
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => { isValid: boolean; error?: string }>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  for (const [field, validator] of Object.entries(rules)) {
    const result = validator(data[field]);
    if (!result.isValid) {
      errors[field as keyof T] = result.error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

/**
 * Sanitize string input
 */
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim().length === 0;
};