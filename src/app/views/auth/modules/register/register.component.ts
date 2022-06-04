import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../../../shared/components/snackbar.component";
import {environment} from "../../../../../environments/environment";
import {AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

function equalPassword(c: AbstractControl): ValidationErrors | null {
  const password = c.get('password');
  const repeatPassword = c.get('repeatPassword');

  if (password && repeatPassword && password.value != repeatPassword.value) {
    return {
      equalPassword: "Passwords don't coincide",
    };
  }
  return null;
}

export class EqualPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    const isParentInvalid = control?.parent?.hasError('equalPassword') || false;
    return (
      isParentInvalid && (control?.dirty || false)
    );
  }
}

@Component({
  selector: 'ac-register',
  template: `
    <ac-login-grid>
      <!-- FIRST COL -->
      <ac-login [title]="'Register'" class="first-col">
        <ng-container class="form-column">
          <form [formGroup]="registerForm" class="register-form" (ngSubmit)="register()">

            <!-- EMAIL INPIUT-->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-icon matPrefix class="me-2" color="primary">mail</mat-icon>
              <mat-label>Email</mat-label>
              <input formControlName="email" matInput type="email" placeholder="email">
              <mat-error *ngIf="email.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="email.hasError('pattern')">Email is invalid</mat-error>
            </mat-form-field>

            <!-- FIRSTNAME E SURNAME INPUT -->
            <table class="element-full-width" cellspacing="0">
              <tr>
                <td>
                  <mat-form-field class="element-full-width" appearance="outline">
                    <mat-label>Firstname</mat-label>
                    <input formControlName="firstname" matInput type="text" placeholder="name">
                    <mat-icon matPrefix class="me-2" color="primary">person</mat-icon>
                    <mat-error *ngIf="firstname.hasError('required')">Name is required</mat-error>
                    <mat-error *ngIf="firstname.hasError('minlength')">Firstname must contain at least 5 characters</mat-error>
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field class="element-full-width" appearance="outline">
                    <mat-icon matPrefix class="me-2" color="primary">person</mat-icon>
                    <mat-label>Surname</mat-label>
                    <input formControlName="surname" matInput type="text" placeholder="surname">
                    <mat-error *ngIf="surname.hasError('required')">Surname is required</mat-error>
                    <mat-error *ngIf="surname.hasError('minlength')">Surname must contain at least 5 characters
                    </mat-error>
                  </mat-form-field>
                </td>
              </tr>
            </table>


            <!-- PASSWORD INPUT -->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-icon matPrefix class="me-2" color="primary">lock</mat-icon>
              <mat-label>Password</mat-label>
              <input formControlName="password" [errorStateMatcher]="matcher" matInput [type]="hidePassword ? 'password' : 'text'" placeholder="password">
              <button mat-icon-button type="button" matSuffix color="primary" (click)="hidePassword = !hidePassword"
                      [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="password.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="password.hasError('pattern') && password.touched">Password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character</mat-error>
            </mat-form-field>


            <!-- REPEAT PASSWORD INPUT -->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-icon matPrefix class="me-2" color="primary">lock</mat-icon>
              <mat-label>Repeat Password</mat-label>
              <input formControlName="repeatPassword" [errorStateMatcher]="matcher" matInput
                     [type]="hideRepeatPassword ? 'password' : 'text'"
                     placeholder="Repeat password">
              <button mat-icon-button type="button" matSuffix color="primary" (click)="hideRepeatPassword = !hideRepeatPassword"
                      [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
                <mat-icon>{{hideRepeatPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>

              <mat-error *ngIf="repeatPassword.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="repeatPassword.hasError('pattern') && repeatPassword.touched">Password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character</mat-error>
            </mat-form-field>
            <ng-container *ngIf="registerForm.hasError('equalPassword') && repeatPassword.touched"><span style="margin-left:12px; font-size: 11px; color:red;">{{registerForm.getError('equalPassword')}}</span></ng-container>

            <!-- SUBMIT BUTTON -->
            <button
              mat-raised-button
              color="primary"
              class="element-full-width mt-1"
              type="submit"
            >
              Register
            </button>


          </form>
          <a routerLink="../sign-in" style="margin-top: 10px;">Already have an account? Sign In</a>
        </ng-container>
      </ac-login>


      <!-- SECOND COL -->
      <div class="second-col" style="padding-right: 100px; text-align: justify">
        <h3 class="mat-headline">Fintech - Services for the public</h3>
        <p>You can read about the Bank of Italy's services for the public by selecting one of the boxes below, which
          contain useful information and any forms you may need.</p>

        <p>You can make requests or reports relating to the Central Credit Register, the Interbank Register of Bad
          Cheques and Payment Cards, complaints, whistleblowing, and how banking and financial services work, by
          accessing the Bank of Italy's 'Online Services for the Public' platform.</p>

        <p>You can look at the content of the Financial Education programme, which is available on the Bank of Italy's
          "Economics for everyone", by clicking on the button below.</p>

        <p>You can book a visit to Palazzo Koch on the days it is open to the public via an online portal: 'Portale di
          prenotazione online' (only available in Italian).</p>

        <p>For more information about these services call the <strong>free phone number 800 19 69 69</strong> or contact
          the Bank of
          Italy Branches. </p>

        <p>To make its toll-free number more accessible, the Bank of Italy provides a service for deaf people by
          customizing the free 'Pedius' App for smartphones and tablets. The app makes it easier to access information
          on some of the Bank of Italy's services: the COVID-19 Emergency, the Banking and Financial Ombudsman,
          Complaints, the Central Credit Register and the Interbank Register of Bad Cheques and Payment Cards. </p>

      </div>


    </ac-login-grid>
  `,
  styles: [
    `
      .register-form {
        min-width: 200px;
        max-width: 530px;
        height: 430px;
        width: 100%;
      }

      a {
        color: var(--indigo-primary);
      }

      a:hover {
        color: var(--amber);
      }

      mat-form-field {
        margin-bottom: 10px;
      }

    `
  ]
})
export class RegisterComponent {

  hidePassword = true;
  hideRepeatPassword = true;

  matcher = new EqualPasswordErrorStateMatcher();

  registerForm = this.fb.group(
    {
      email: ['', [
                        Validators.required,
                        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
                  ],
      ],
      firstname: ['', [
                          Validators.required,
                          Validators.minLength(5)
                      ]
      ],
      surname: ['', [
                        Validators.required,
                        Validators.minLength(5)
                    ]
      ],
      password: ['',  [
                          Validators.required,
                          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
                      ],
      ],
      repeatPassword: ['', [
                                  Validators.required,
                                  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
                            ],
      ],
    },
    {
      validators: equalPassword,
    }
  );

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder) {
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get firstname() {
    return this.registerForm.get('firstname')!;
  }

  get surname() {
    return this.registerForm.get('surname')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword')!;
  }

  register() {
    if (this.registerForm.valid) {
      console.log("Register");
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: 'Thank you for Registering',
        duration: environment.snackBarDuration * 1000,
        panelClass: ['snackbar']
      });
    }
  }

}
