import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Contact} from "../../../models/contact";
import {DeleteContactModalComponent} from "./delete-contact-dialog.component";

@Component({
  selector: 'ac-contact-list',
  template: `

    <!-- SEARCH INPUT -->
    <mat-form-field class="element-form-field element-full-width" appearance="outline">
      <mat-icon matPrefix class="me-2">person_search</mat-icon>
      <mat-label>Search</mat-label>
      <input matInput type="text" [(ngModel)]="searchValue">
      <button *ngIf="searchValue" matSuffix mat-icon-button aria-label="Clear" (click)="searchValue=''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>

    <!-- CONTACTS LIST -->
    <mat-list>
      <div mat-subheader>Contacts</div>
      <mat-list-item *ngFor="let contact of contacts | filterByText:searchValue">
        <mat-icon mat-list-icon>account_circle</mat-icon>
        <div mat-line>{{contact.name | titlecase}} {{contact.surname | titlecase}}</div>
        <div mat-line> {{contact.iban}} </div>
        <button mat-icon-button
                matTooltip="Select"
                aria-label="Button that displays a tooltip when focused or hovered over"
                [mat-dialog-close]="contact._id"
        >
          <mat-icon matSuffix class="pe-3">check</mat-icon>
        </button>

        <button mat-icon-button
                matTooltip="Edit"
                aria-label="Button that displays a tooltip when focused or hovered over"
                (click)="editContact.emit(contact._id)"
        >
          <mat-icon matSuffix class="pe-3">edit</mat-icon>
        </button>

        <button mat-icon-button
                (click)="openRemoveContactDialog(contact)"
                matTooltip="Delete"
                aria-label="Button that displays a tooltip when focused or hovered over"
        >
          <mat-icon matSuffix class="pe-3">delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
  ]
})
export class ContactListComponent {

  searchValue = '';
  @Input() contacts:Contact[] | null = [];
  @Output() deleteContact = new EventEmitter<string>();
  @Output() editContact = new EventEmitter<string>();



  constructor(public dialog: MatDialog) { }


  openRemoveContactDialog(contact: Contact) {
    const dialogRef = this.dialog.open(DeleteContactModalComponent, {
      width: '500px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteContact.emit(result);
      }
    });

  }
}
