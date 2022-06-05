import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarComponent} from "../../shared/components/snackbar.component";
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {ContactsComponent} from "./components/contacts.component";
import {environment} from "../../../environments/environment";
import {Contact} from "../../models/contact";
import {selectContacts} from "./store/contacts/contacts.selectors";
import {Store} from "@ngrx/store";
import * as Actions from "./store/contacts/contacts.actions";
import {BehaviorSubject} from "rxjs";
import {CardsService} from "../../api/cards.service";
import {Card} from "../../models/card";


@Component({
  selector: 'ac-transfer',
  template: `
    <div class="container mt-5">
      <mat-card class="mx-auto mat-elevation-z4">
        <form [formGroup]="transferForm" class="transfer-form" (ngSubmit)="transferMoney()">

          <!-- CONTACT LIST BTN -->
          <button type="button" mat-stroked-button class="element-full-width mb-3" (click)="openContactsListFormDialog()"><strong>Contacts List</strong></button>

          <!-- FIRSTNAME INPUT -->
          <mat-form-field class="element-full-width" appearance="outline">
            <mat-icon matPrefix class="me-2">person</mat-icon>
            <mat-label>Firstname </mat-label>
            <input matInput formControlName="name">
            <mat-error *ngIf="name.hasError('required')">Firstname is required</mat-error>
            <mat-error  *ngIf="name.hasError('minlength')">Firstname must contain at least 5 characters</mat-error>
          </mat-form-field>



          <!-- SURNAME INPUT -->
          <mat-form-field class="element-full-width" appearance="outline">
            <mat-icon matPrefix class="me-2">person</mat-icon>
            <mat-label>Surname</mat-label>
            <input matInput formControlName="surname">
            <mat-error *ngIf="surname.hasError('required')">Surname is required</mat-error>
            <mat-error *ngIf="surname.hasError('minlength')">Surname must contain at least 5 characters</mat-error>
          </mat-form-field>


          <!-- IBAN INPUT -->
          <mat-form-field class="element-full-width" appearance="outline">
            <mat-icon matPrefix class="me-2">pin</mat-icon>
            <mat-label>IBAN</mat-label>
            <input matInput formControlName="iban">
            <mat-error *ngIf="iban.hasError('required')">IBAN is required</mat-error>
          </mat-form-field>


          <!-- TRANSFER FORM GROUP -->
          <ng-container formGroupName="transfer">
            <!-- IMPORT INPUT -->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-icon matPrefix class="me-2">attach_money</mat-icon>
              <mat-label>Import</mat-label>
              <input matInput formControlName="import">
              <mat-error *ngIf="import.hasError('required')">Import is required</mat-error>
              <mat-error >Import can only contain numbers</mat-error>
            </mat-form-field>


            <!-- SELECT A CARD INPUT -->
            <mat-form-field class="element-full-width" appearance="outline">
              <mat-icon matPrefix class="me-2">credit_card</mat-icon>
              <mat-label>Select me</mat-label>
              <mat-select formControlName="card">
                <mat-option [value]="card._id" *ngFor="let card of (cards$ | async)">{{card.number}}</mat-option>
              </mat-select>
              <mat-error *ngIf="card.hasError('required')">Import is required</mat-error>
            </mat-form-field>
          </ng-container>



          <button mat-raised-button color="primary" class="element-full-width" [disabled]="transferForm.invalid"><strong>Transfer Money</strong></button>
        </form>
      </mat-card>
    </div>

  `,
  styles: [
    `
  .transfer-form, mat-card {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }



  `]
})
export class TransferComponent implements OnInit {
  contacts$ = this.store.select(selectContacts);
  cards$ = new BehaviorSubject<Card[]>([]);


  transferForm = this.fb.group({
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
    iban: ['', [
                    Validators.required
                ]
    ],
    transfer: this.fb.group({
      import: ['',  [
                      Validators.required,
                      Validators.pattern('^[0-9]*$')
                    ]
      ],
      card: ['',  [
                      Validators.required
                  ]
      ],
    }),
  });


  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store,
    private cardsService: CardsService,
  ) {}

  get name() {
    return this.transferForm.get('name')!;
  }

  get surname() {
    return this.transferForm.get('surname')!;
  }

  get iban() {
    return this.transferForm.get('iban')!;
  }

  get transfer() {
    return this.transferForm.get('transfer')!;
  }

  get import() {
    return this.transfer.get('import')!;
  }

  get card() {
    return this.transfer.get('card')!;
  }


  transferMoney() {
    if (this.transferForm.valid) {
      console.log('valid form');

      this.snackBar.openFromComponent(SnackbarComponent, {
        data: 'Transfer was successfull',
        duration: environment.snackBarDuration * 1000,
        panelClass: ['snackbar'],
      });
    }


  }

  ngOnInit(): void {
    this.store.dispatch(Actions.getContacts());
    this.cardsService.getCards().subscribe(res => this.cards$.next(res));
  }

  openContactsListFormDialog(): void {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '500px',
      data: this.contacts$
    });

    dialogRef.afterClosed().subscribe((contactId) => {
      if(contactId) {
        let contacts: Contact[] = [];
        this.contacts$.subscribe(res => contacts = res);
        const selectedContact = contacts.find(c => c._id === contactId);
        this.name.setValue(selectedContact?.name);
        this.surname.setValue(selectedContact?.surname);
        this.iban.setValue(selectedContact?.iban);
      }
    });
  }



}
