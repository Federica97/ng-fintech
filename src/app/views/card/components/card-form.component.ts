import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from "@angular/forms";
import {CardForm} from "../../../models/card-form";


@Component({
  selector: 'ac-card-form',
  template: `
    <div class="container-fluid">
      <form [formGroup]="cardForm" class="card-form">
        <div mat-subheader class="form-title"><strong>Add New Card</strong></div>

        <!-- CARD TYPE INPUT -->
        <mat-form-field class="element-full-width" appearance="outline">
          <mat-icon matPrefix class="me-2">account_balance</mat-icon>
          <mat-label>Select Card Type</mat-label>
          <mat-select formControlName="type">
            <mat-option *ngFor="let type of types" [value]="type">{{type | titlecase}}</mat-option>
          </mat-select>
          <mat-error *ngIf="type.hasError('required')">Card Type is required</mat-error>
        </mat-form-field>

        <!-- NAME & SURNAME INPUT -->
        <table class="element-full-width" cellspacing="0">
          <tr>
            <td>
              <mat-form-field class="element-full-width" appearance="outline">
                <mat-icon matPrefix class="me-2">person</mat-icon>
                <mat-label>Firstname</mat-label>
                <input matInput formControlName="name" type="text">
                <mat-error *ngIf="name.hasError('required')">Firstname is required</mat-error>
                <mat-error *ngIf="name.hasError('minlength')">Firstname must contain at least 5 characters
                </mat-error>
              </mat-form-field>
            </td>

            <td>
              <mat-form-field class="element-full-width" appearance="outline">
                <mat-icon matPrefix class="me-2">person</mat-icon>
                <mat-label>Surname</mat-label>
                <input matInput formControlName="surname" type="text">
                <mat-error *ngIf="surname.hasError('required')">Surname is required</mat-error>
                <mat-error *ngIf="surname.hasError('minlength')">Surname must contain at least 5 characters</mat-error>
              </mat-form-field>
            </td>
          </tr>
        </table>

        <!-- CARD NUMBER INPUT -->
        <mat-form-field class="element-full-width" appearance="outline">
          <mat-label>Card Number</mat-label>
          <mat-icon matPrefix class="me-2">credit_card</mat-icon>
          <input matInput formControlName="number" type="text" acCreditCardNumberFormat>
          <mat-hint align="end">{{getCardNumberLength()}}/ 16</mat-hint>
          <mat-error *ngIf="number.hasError('required')">Card Number is required</mat-error>
          <mat-error *ngIf="number.hasError('minlength')">Card Number is too short</mat-error>
          <mat-error *ngIf="number.hasError('pattern')">Card Number must only contain numbers</mat-error>
        </mat-form-field>


        <!-- CARD SECURITY CODE INPUT -->
        <mat-form-field class="element-full-width" appearance="outline">
          <mat-label>Card Security Code</mat-label>
          <mat-icon matPrefix class="me-2">password</mat-icon>
          <input matInput formControlName="csc" type="text">
          <mat-hint align="end">{{csc.value?.length}} / 3</mat-hint>
          <mat-error *ngIf="csc.hasError('required')">Card Security Code is required</mat-error>
          <mat-error *ngIf="csc.hasError('minlength')">Card Security Code is too short</mat-error>
          <mat-error *ngIf="csc.hasError('pattern')">Card Security Code must only contain numbers
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" class="element-full-width my-3" (click)="addCard()">Add Card</button>
        <button mat-stroked-button type="button" color="warn" class="element-full-width" (click)="closeForm()">Cancel
        </button>
      </form>
    </div>

  `,
  styles: [
    `
      .form-title {
        color: var(--light-black-35);
      }


      .card-form {
        width: 100%;
      }


    `
  ]
})
export class CardFormComponent {

  @ViewChild(FormGroupDirective, { static: true }) group!: FormGroupDirective;
  @Output() closeFormToAddCard = new EventEmitter<void>();
  @Output() addNewCard = new EventEmitter<CardForm>();


  cardForm = this.fb.group({
    type: ['',  [
                        Validators.required
                    ]
    ],
    name: ['', [
                        Validators.required,
                        Validators.minLength(5)
                    ]
    ],
    surname: ['', [
                        Validators.required,
                        Validators.minLength(5)
                  ]
    ],
    number: ['', [
                        Validators.required,
                        Validators.minLength(19),
                        Validators.maxLength(19),
                        Validators.pattern("^[0-9\\s]*$"),
                ]
    ],
    csc: ['', [
                                Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(3),
                                Validators.pattern("^[0-9]*$")
                            ]
    ]
  })


  types = ['visa', 'mastercard'];

  constructor(private fb: FormBuilder) {}

  get type(){
    return this.cardForm.get('type')!;
  }

  get name() {
    return this.cardForm.get('name')!;
  }

  get surname() {
    return this.cardForm.get('surname')!;
  }

  get number() {
    return this.cardForm.get('number')!;
  }

  get csc() {
    return this.cardForm.get('csc')!;
  }

  closeForm() {
    this.closeFormToAddCard.emit();
  }

  addCard() {
    if(this.cardForm.valid) {
      this.addNewCard.emit(this.cardForm.value);
    }
  }

  public cleanUp() {
    this.cardForm.reset();
    this.type.setErrors(null);
    this.name.setErrors(null);
    this.surname.setErrors(null);
    this.number.setErrors(null);
    this.csc.setErrors(null);
  }

  getCardNumberLength(): number {
    length = 0;
    if(this.number.value?.length) {
      if (this.number.value?.length > 0 && this.number.value?.length <= 5) {
        length = this.number.value?.length;
      } else if (this.number.value?.length > 5 && this.number.value?.length < 11) {
        length = this.number.value?.length - 1;
      } else if (this.number.value?.length > 11 && this.number.value?.length < 16) {
        length = this.number.value?.length - 2;
      } else if (this.number.value?.length >= 17 && this.number.value?.length < 19) {
        length = this.number.value?.length - 3;
      } else if (this.number.value?.length == 19) {
        length = 16;
      }
    }
    return length;
  }
}
