import {Component, Inject, OnInit} from '@angular/core';
import {TransferComponent} from "../transfer.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Contact} from "../../../models/contact";
import {ContactForm} from "../../../models/contact-form";
import {BehaviorSubject, combineLatest, map, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import * as Actions from "../store/contacts/contacts.actions"
import {environment} from "../../../../environments/environment";
import {SnackbarComponent} from "../../../shared/components/snackbar.component";


@Component({
  selector: 'ac-contacts',
  template: `
    <div mat-dialog-content class="contact-dialog">
      <ng-container *ngIf="showMainContactView">
        <ac-contact-list
          [contacts]="contacts$ | async"
          (deleteContact)="deleteContactHandler($event)"
          (editContact)="editContactHandler($event)"
        >
        </ac-contact-list>
        <div mat-dialog-actions align="end">
          <button mat-stroked-button (click)="onNoClick()">Go back</button>
          <button mat-raised-button color="primary" (click)="showMainContactView=!showMainContactView">New Contact
          </button>
        </div>
      </ng-container>
      <ng-container *ngIf="!showMainContactView">
        <button mat-stroked-button class="element-full-width mb-3" (click)="goBackToListView()">Go
          Back
        </button>
        <ac-contact-form
          [selectedContact]="(selectedContact$ | async) || null"
          (saveContact)="saveContactHandler($event)"
        ></ac-contact-form>
      </ng-container>
    </div>
  `,
  styles: [`
    .contact-dialog {
      min-height: 350px;
      height: 100%;
    }
  `]
})
export class ContactsComponent implements OnInit{

  showMainContactView: boolean = true;
  selectedContactId$ = new BehaviorSubject<string>('');

  selectedContact$ = combineLatest([this.contacts$, this.selectedContactId$]).pipe(
    map(([contacts, contactId]) => contacts.find(contact => contact._id === contactId))
  )

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    public dialogRef: MatDialogRef<TransferComponent>,
    @Inject(MAT_DIALOG_DATA) public contacts$: Observable<Contact[]>
  ) {
  }

  ngOnInit() {}

  deleteContactHandler(contactId: string) {
    this.store.dispatch(Actions.removeContacts({id: contactId}));
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: 'Contact deleted successfully',
      duration: environment.snackBarDuration * 1000,
      panelClass: ['snackbar']
    });
  }


  editContactHandler(contactId: string) {
    this.selectedContactId$.next(contactId);
    this.showMainContactView = false;
  }

  goBackToListView() {
    this.selectedContactId$.next('');
    this.showMainContactView=!this.showMainContactView;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveContactHandler(data: { contactForm: ContactForm; isEditMode: boolean; selectedContactId?: string }) {
      if(data.isEditMode && !!data.selectedContactId) {
        this.store.dispatch(Actions.editContact({id: data.selectedContactId, contact: data.contactForm}))
        this.selectedContactId$.next('');
      }
      else {
        this.store.dispatch(Actions.addContact({contact: data.contactForm}))
      }
      this.showMainContactView = !this.showMainContactView;
  }
}

