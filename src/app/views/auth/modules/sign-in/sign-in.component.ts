import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'ac-sign-in',
  template: `
    <ac-login-grid>
      <ac-login [title]="'Sign In'" class="first-col">
        <ng-container class="form-column">
          <form [formGroup]="signInForm" class="sign-in-form mb-3" (ngSubmit)="signIn()">

            <!-- EMAIL INPUT -->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-icon matPrefix class="me-2" color="primary">mail</mat-icon>
              <mat-error *ngIf="email.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="email.hasError('pattern')">Email is invalid</mat-error>
            </mat-form-field>

            <!-- PASSWORD INPUT -->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <mat-icon matPrefix class="me-2" color="primary">lock</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword"
                      [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
                <mat-icon color="primary">{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="password.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="password.hasError('pattern')">Password must contain at least 8 characters, at least one
                uppercase letter, one lowercase letter, one number and one special character
              </mat-error>
            </mat-form-field>


            <!-- SUBMIT BUTTON -->
            <button
              mat-raised-button
              color="primary"
              class="element-full-width mt-4"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <a routerLink="../register">Create a new account</a>
        </ng-container>
      </ac-login>

      <!-- SECOND COL -->
      <div class="second-col" style="padding-right: 100px; text-align: justify">
        <h3 class="mat-headline">Fintech</h3>
        <p>The Bank of Italy is the central bank of the Italian Republic; is a public law institution, regulated by
          national and European laws. It is part of the national central banks of the euro area and the <strong>European
            Central Bank</strong>. The Euro and the central banks of the Member States of the European Union have not
          adopted the euro which make up the <strong>European System of Central Banks.</strong></p>

        <p>It pursues the purpose of general interest in the monetary and financial sector: the maintenance of price
          stability, the main objective of the Eurosystem in accordance with the <strong>Treaty on the Functioning of
            the European Union</strong>; the stability and efficiency of the financial system, in implementation of the
          principle of protection of savings enshrined in the <strong>Constitution</strong> (Article 47 - The Republic
          encourages and protects savings in all its forms; regulates, coordinates and controls the exercise of credit)
          , and the other tasks entrusted to it by national law.</p>

        <p>In Europe, the Bank of Italy is the <strong>competent national authority under the Single Supervisory
          Mechanism (SSM)</strong> on banks and is the national resolution authority under the <strong>Single Resolution
          Mechanism</strong> (SRM), of banks and securities firms.</p>

        <p>The functional and governance structure of the Bank reflects the need to rigorously protect its independence
          from external influences, an essential prerequisite for carrying out institutional action. The national and
          European regulations necessary for the mandate; in the face of this autonomy, stringent duties of transparency
          and publicity are envisaged. The Institute reports its work to the Government, Parliament and citizens through
          the dissemination of data and news on institutional activities and the use of resources.</p>

        <p>The Bank of Italy is an organization of approximately 6,800 people with multidisciplinary skills; to employ
          human resources and financial qualities to offer services by acting in an efficient, responsible and impartial
          manner. In order to perform its functions in the best possible way, in an environment characterized by
          increasing complexity and profound changes, the Bank of Italy outlines, within a strategic planning system,
          the vision, the medium-term objectives and the related lines of action. </p>

      </div>
    </ac-login-grid>



  `,
  styles: [
    `
      .sign-in-form {
        min-width: 200px;
        max-width: 500px;
        width: 100%;
      }

      a {
        color: var(--indigo-primary);
      }

      a:hover {
        color: var(--amber);
      }

    `]
})
export class SignInComponent  {

  hidePassword = true;

  signInForm = this.fb.group({
      email: ['', [
                    Validators.required,
                    Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
                  ]
      ],
      password: ['',[
                    Validators.required,
                    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
                    ],
      ],
  });

  constructor(private fb: FormBuilder) {}

  get email() {
    return this.signInForm.get('email')!;
  }

  get password() {
    return this.signInForm.get('password')!;
  }

  signIn() {
    if(this.signInForm.valid) {
      console.log(this.signInForm.value);
      //TODO: sign in
    }
  }
}
