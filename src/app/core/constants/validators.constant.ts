import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /^[0-9]{10,12}$/;

/**
 * Generic validator jo check karta hai ki provide kiye gaye fields mein se 
 * kam se kam ek field filled ho.
 */
export function atLeastOneRequired(controlNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = controlNames.some(name => {
      const value = control.get(name)?.value;
      return value && value.trim() !== ''; // Check for non-empty string
    });

    return isValid ? null : { atLeastOneRequired: true };
  };
}