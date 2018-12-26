in constructor( public formBuilder: FormBuilder){
 this.initializeForm();
  }

  initializeForm() {

    this.credentialsForm = this.formBuilder.group({
      firstName: [this.MyFirstName, Validators.compose([MyValidator.textFormat, Validators.required])],
      contact1: [this.MyContact1, Validators.compose([MyValidator.phoneFormat, Validators.required])],
      email: [this.MyEmail, Validators.compose([MyValidator.mailFormat, Validators.required])],
      password: [this.MyPassword, Validators.compose([MyValidator.passwordFormat, Validators.required])],
      confirmPassword: [this.confirmPassword, Validators.compose([MyValidator.passwordFormat, Validators.required])]

    }, { validators: this.checkPasswords });

  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
*************************************************************************************************
in html:
<ion-list>
<form [formGroup]="credentialsForm ">


      <ion-item>
        <ion-label color="primary" floating>First Name</ion-label>
        <ion-input type="text" [formControl]="credentialsForm.controls['firstName']" [(ngModel)]="MyFirstName"></ion-input>
      </ion-item>

      <ion-item *ngIf="credentialsForm.controls.firstName.hasError('required')  && submitAttempt">
        <p class="validator-error">First Name is required</p>
      </ion-item>



      <ion-item *ngIf="credentialsForm.controls.firstName.hasError('textPattern')  && submitAttempt">
        <p class="validator-error">Please enter a valid name.</p>
      </ion-item>
      <ion-item>
        <ion-label color="primary" floating>Email</ion-label>
        <ion-input type="email" formControlName="email" [(ngModel)]="MyEmail"></ion-input>
      </ion-item>

      <ion-item *ngIf="credentialsForm.controls.email.hasError('required')  && submitAttempt">
        <p class="validator-error">Email is required</p>
      </ion-item>

      <ion-item *ngIf="credentialsForm.controls.email.hasError('mailPattern') && !credentialsForm.controls.email.hasError('required')  && submitAttempt">
        <p class="validator-error">Please enter a valid email address.</p>
      </ion-item>


      <ion-item>
        <ion-label color="primary" floating>Password</ion-label>
        <ion-input type="password" formControlName="password" [(ngModel)]="MyPassword"></ion-input>
      </ion-item>


      <ion-item *ngIf="credentialsForm.controls.password.hasError('required')  && submitAttempt">
        <p class="validator-error">Password is required</p>
      </ion-item>

      <ion-item *ngIf="credentialsForm.controls.password.hasError('passwordPattern') && !credentialsForm.controls.password.hasError('required')  &&  submitAttempt">
        <p class="validator-error">Please enter a valid password.</p>
      </ion-item>


      <ion-item>
        <ion-label color="primary" floating>Confirm Password</ion-label>
        <ion-input type="password" formControlName="confirmPassword" [(ngModel)]="confirmPassword"></ion-input>
      </ion-item>


      <ion-item *ngIf="credentialsForm.controls.confirmPassword.hasError('required')  && submitAttempt">
        <p class="validator-error">Confirm Password is required</p>
      </ion-item>

      <ion-item *ngIf="credentialsForm.controls.confirmPassword.hasError('passwordPattern') && submitAttempt">
        <p class="validator-error">Please enter a valid password.</p>
      </ion-item>


      <ion-item *ngIf="!credentialsForm.controls.password.hasError('required')  &&!credentialsForm.controls.confirmPassword.hasError('required') && (credentialsForm .controls.confirmPassword.value !== credentialsForm.controls.password.value)  && submitAttempt">
        <p class="validator-error"> Passwords do not match
        </p>
      </ion-item>
      
</form>
</ion-list>
*****************************************************************************************************************
MyValidator.ts
import { FormControl } from '@angular/forms';

export class MyValidator {

    static mailFormat(control: FormControl): ValidationResult {

        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;


        if (control.value == "" || EMAIL_REGEXP.test(control.value)
        ) {
            return null;
        } else {
            return { "mailPattern": true };
        }
    }


    static phoneFormat(control: FormControl): ValidationResult {

        let PHONE_REGEX = /^((\\+91-?)|0)?[0-9]{11}$/;

        if (control.value == "" || PHONE_REGEX.test(control.value)
        ) {
            return null;
        } else {
            return { "phonePattern": true };
        }
    }

    static passwordFormat(control: FormControl): ValidationResult {

        let PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/;


        if (control.value == "" || PASSWORD_REGEX.test(control.value)
        ) {
            return null;
        } else {
            return { "passwordPattern": true };
        }
    }


    static textFormat(control: FormControl): ValidationResult {

        let Text_REGEX = /^[A-Za-z]{3,32}/;


        if (control.value == "" || Text_REGEX.test(control.value)
        ) {
            return null;
        } else {
            return { "textPattern": true };
        }
    }


}

interface ValidationResult {
    [key: string]: boolean;
}
