import {Component, Inject, OnInit} from '@angular/core';
import {TransferComponent} from "../transfer.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Contact} from "../../../models/contact";
import {ContactForm} from "../../../models/contact-form";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as Actions from "../store/contacts/contacts.actions"
import {environment} from "../../../../environments/environment";
import {SnackbarComponent} from "../../../shared/components/snackbar.component";


@Component({
  selector: 'ac-contacts',
  template: `
    <div mat-dialog-content class="contact-dialog">
      <ng-container *ngIf="(state$ | async)?.type === 'list'">
        <ac-contact-list
          [contacts]="contacts$ | async"
          (deleteContact)="deleteContactHandler($event)"
          (editContact)="editContactHandler($event)"
        >
        </ac-contact-list>
        <div mat-dialog-actions align="end">
          <button mat-stroked-button (click)="onNoClick()">Go back</button>
          <button mat-raised-button color="primary" (click)="state$.next({type:'new'})">New Contact
          </button>
        </div>
      </ng-container>
      <ng-container *ngIf="(state$ | async)?.type === 'edit' || (state$ | async)?.type === 'new'">
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
  state$ = new BehaviorSubject<{type: 'list' | 'new' | 'edit', id?: string}>({type:'list'});


  selectedContact$ = combineLatest([this.contacts$, this.state$]).pipe(
    map(([contacts, state]) => {
      if(state.type==='edit') {
        return contacts.find(c => c._id === state.id);
      }
      else return null;
    })
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
    this.state$.next({type: 'edit', id: contactId});
    this.showMainContactView = false;
  }

  goBackToListView() {
    this.state$.next({type: 'list'});
    this.showMainContactView=!this.showMainContactView;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveContactHandler(contact: ContactForm) {
      if(this.state$.value.type==='edit' && this.state$.value.id) {
        this.store.dispatch(Actions.editContact({id: this.state$.value.id, contact: contact}))
      }
      else {
        this.store.dispatch(Actions.addContact({contact: contact}))
      }
    this.state$.next({type: 'list'});
  }
}

