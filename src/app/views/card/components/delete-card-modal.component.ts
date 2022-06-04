import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface DialogCardData {
  title: string;
  cardId: string;
  cardNumber: string
  cardType: string
  cardAmount: string
  action: string;
}



@Component({
  selector: 'ac-alert',
  template: `

    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
      <mat-card class="mat-elevation-z4" [ngClass]="{
      'visa': data.cardType==='visa',
      'mastercard': data.cardType==='mastercard'
      }"
      >
        <mat-card-title style="float:right;">
          <img *ngIf="data.cardType==='mastercard'" src="../../../../assets/mastercard-logo.png" alt="card-type-logo">
          <img *ngIf="data.cardType==='visa'" src="../../../../assets/visa-logo.png" alt="card-type-logo">
        </mat-card-title>

        <mat-card-content class="mt-5">

          <div class="card-number">
            <img src="../../../../assets/card-chip.PNG" alt="card-type-logo">
            <span style="padding-left: 20px;"><strong>{{data.cardNumber}}</strong></span>
          </div>
          <div class="mt-3" style="float: right; margin-right: 10px;">
            02/27
          </div>
        </mat-card-content>
      </mat-card>
      <div class="mt-3">
        <mat-divider></mat-divider>
        <h3 class="mat-h3">
          <mat-icon matPrefix class="mt-2">attach_money</mat-icon>
          <span class="aligned-with-icon">Card Amount:<strong> {{data.cardAmount | currency:'EUR'}}</strong></span>
        </h3>
      </div>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button color="warn"
        [mat-dialog-close]="data.cardId"
        cdkFocusInitial
      >
        {{data.action}}
      </button>
    </div>
  `,
  styles: [
    `
      mat-card {
        height: 180px;
      }

      .mastercard {
        background: linear-gradient(90deg, rgba(0, 0, 139, 1) 0%, rgba(77, 65, 255, 1) 47%, rgba(0, 0, 139, 1) 100%);
        color: #fff;
      }

      .visa {
        background: linear-gradient(90deg, rgba(255, 160, 0, 1) 0%, rgba(255, 235, 0, 1) 47%, rgba(255, 160, 0, 1) 100%);
      }

      .card-number {
        font-size: 1.3em;
        letter-spacing: .2em;
      }

      mat-card-title img, mat-card-content img {
        width: 50px;
      }


    `]
})
export class DeleteCardModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCardData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
