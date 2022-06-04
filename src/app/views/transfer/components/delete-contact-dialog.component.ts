import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contact} from "../../../models/contact";



@Component({
  selector: 'ac-alert',
  template: `
    <h1 mat-dialog-title>Are you sure you want to delete <strong>{{data.name | titlecase}} {{data.surname | titlecase}}</strong> from your contacts?</h1>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="data._id" cdkFocusInitial>Delete</button>
    </div>
  `,
  styles: [``]
})
export class DeleteContactModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
