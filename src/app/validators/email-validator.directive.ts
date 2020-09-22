import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const EmailValidator: ValidatorFn = (control: FormGroup):
ValidationErrors | null =>{
  
  const email = control.get('email');
  const emailConfirm = control.get('emailConfirm');
  return email.value !== emailConfirm.value? {emailNotConfirmed: true} : null

}


@Directive({
  selector: '[appEmailNotConfirmed]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return EmailValidator(control);
  }
}
