import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { APP_CONSTANTS } from './constants';

export class CustomValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const isValid = APP_CONSTANTS.REGEX.EMAIL.test(control.value);
    return isValid ? null : { email: true };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const isValid = APP_CONSTANTS.REGEX.PASSWORD.test(control.value);
    return isValid ? null : { password: true };
  }

  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) return null;

      if (matchingControl.errors && !matchingControl.errors['mismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}