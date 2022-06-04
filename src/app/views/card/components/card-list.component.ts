import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../../models/card";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCardModalComponent} from "./delete-card-modal.component";

@Component({
  selector: 'ac-card-list',
  template: `
    <div class="container-fluid">

      <mat-list>
        <div mat-subheader class="list-title"><strong>Cards</strong></div>
        <mat-list-item *ngFor="let card of cards">
          <mat-icon mat-list-icon>credit_card</mat-icon>
          <h3 matLine>{{card.number}}</h3>
          <p matLine>

              <span> <strong>{{card.amount | currency: 'EUR'}} </strong></span>
            <span> - <i>{{card.type}}</i> </span>

          </p>
          <button mat-icon-button
                  matTooltip="View Transactions"
                  aria-label="Button that displays a tooltip when focused or hovered over"
                  (click)="viewTransaction.emit(card._id)"
          >
            <mat-icon matSuffix class="pe-3">receipt_long</mat-icon>
          </button>

          <button mat-icon-button
                  matTooltip="Remove"
                  aria-label="Button that displays a tooltip when focused or hovered over"
                  (click)="openDeleteCardDialog(card._id)"
          >
            <mat-icon matSuffix>delete</mat-icon>
          </button>
          <mat-divider></mat-divider>
        </mat-list-item>
      </mat-list>

      <button mat-raised-button color="primary" class="element-full-width mt-3" (click)="openFormToAddCard.emit()">Add</button>
    </div>
  `,
  styles: [
    `
        .list-title {
          color: var(--light-black-35);
        }


    `
  ]
})
export class CardListComponent {

  @Input() cards: Card[] | null = [];
  @Output() viewTransaction = new EventEmitter<string>();
  @Output() removeCard = new EventEmitter<string>();
  @Output() openFormToAddCard = new EventEmitter<void>();


  constructor(public dialog: MatDialog) {}

  openDeleteCardDialog(id: string) {
    const card = this.cards?.find(card => card._id === id);
    const dialogRef = this.dialog.open(DeleteCardModalComponent, {
      width: '400px',
      data: {
        title:  `Are you sure you want to delete this Card: `,
        cardId: `${card?._id}`,
        cardNumber: `${card?.number}`,
        cardType:  `${card?.type}`,
        cardAmount: `${card?.amount} `,
        action: "Delete"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeCard.emit(result);
      }
    });
  }
}
