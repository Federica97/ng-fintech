import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Contact} from "../../../models/contact";
import {ContactForm} from "../../../models/contact-form";

@Component({
  selector: 'ac-contact-form',
  template: `
    <form [formGroup]="contactForm" (ngSubmit)="save()">

      <!-- FIRSTNAME INPUT-->
      <mat-form-field class="element-full-width" appearance="outline">
        <mat-icon matPrefix class="me-2">person</mat-icon>
        <mat-label>Firstname</mat-label>
        <input matInput formControlName="name">
        <mat-error *ngIf="name.hasError('required')">Firstname is required</mat-error>
        <mat-error *ngIf="name.hasError('minlength')">Firstname must contain at least 5 characters</mat-error>
      </mat-form-field>

      <!-- SURNAME INPUT-->
      <mat-form-field class="element-full-width" appearance="outline">
        <mat-icon matPrefix class="me-2">person</mat-icon>
        <mat-label>Surname</mat-label>
        <input matInput formControlName="surname">
        <mat-error *ngIf="surname.hasError('required')">Surname is required</mat-error>
        <mat-error *ngIf="surname.hasError('minlength')">Surname must contain at least 5 characters</mat-error>
      </mat-form-field>

      <!-- IBAN INPUT-->
      <mat-form-field class="element-full-width" appearance="outline">
        <mat-icon matPrefix class="me-2">person</mat-icon>
        <mat-label>IBAN</mat-label>
        <input matInput formControlName="iban">
        <mat-error *ngIf="iban.hasError('required')">IBAN is required</mat-error>
      </mat-form-field>

      <button [disabled]="contactForm.invalid" mat-raised-button color="primary" class="element-full-width mb-3">Save
      </button>

    </form>
  `,
  styles: [
  ]
})
export class ContactFormComponent implements OnInit{

  @Input() selectedContact: Contact | null = null;
  @Output() saveContact = new EventEmitter<ContactForm>();

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    surname: ['', [Validators.required, Validators.minLength(5)]],
    iban: ['', [Validators.required]]
  })


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if(this.selectedContact) {
      this.name.setValue(this.selectedContact.name);
      this.surname.setValue(this.selectedContact.surname);
      this.iban.setValue(this.selectedContact.iban);
    }
  }

  get name() {
    return this.contactForm.get('name')!;
  }

  get surname() {
    return this.contactForm.get('surname')!;
  }

  get iban() {
    return this.contactForm.get('iban')!;
  }

  save() {
    this.saveContact.emit(this.contactForm.value);
  }


}
