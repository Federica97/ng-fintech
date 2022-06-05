import {Component, OnInit, ViewChild} from '@angular/core';
import {CardForm} from "../../models/card-form";
import {CardFormComponent} from "./components/card-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../shared/components/snackbar.component";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {selectCards} from "./store/card.selectors";
import * as Actions from './store/card.actions';
import {Router} from "@angular/router";


@Component({
  selector: 'ac-card',
  template: `

    <mat-drawer-container class="example-container">
      <mat-drawer #sideNav mode="side" [opened]="isFormOpened" position="end" class="mat-elevation-z4">
        <ac-card-form
          #formComponent
          (addNewCard)="addNewCardHandler($event)"
          (closeFormToAddCard)="closeFormToAddCardHandler()"
        ></ac-card-form>
      </mat-drawer>
      <mat-drawer-content>
        <ac-card-list
          [cards]="cards$ | async"
          (openFormToAddCard)="openFormToAddCardHandler()"
          (removeCard)="removeCardHandler($event)"
          (viewTransaction)="viewTransactionHandler($event)"
        ></ac-card-list>
      </mat-drawer-content>
    </mat-drawer-container>


  `,
  styles: [`
      mat-drawer-container {
        margin: 0;
        height: 100vh;
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.5);
      }

      mat-drawer-content {
        background-color: var(--dark-white);
      }
  `]
})
export class CardComponent implements OnInit {

  @ViewChild('formComponent', { read: CardFormComponent}) cardFormComponent!: CardFormComponent;

  isFormOpened: boolean = false;
  cards$ = this.store.select(selectCards);

  constructor(private snackBar: MatSnackBar, private store: Store, private router: Router) {}

  ngOnInit(): void {
     this.store.dispatch(Actions.getCards());
  }

  openFormToAddCardHandler() {
    this.isFormOpened = true;
  }

  closeFormToAddCardHandler() {
    this.cardFormComponent.cleanUp();
    this.isFormOpened = false;
  }

  addNewCardHandler(card: CardForm) {
    this.store.dispatch(Actions.addCard({ cardType: card.type, name: card.name, surname: card.surname, number: card.number, csc: card.csc  }));
    this.closeFormToAddCardHandler();
    this.openSnackbar("Card added successfully");
    this.cardFormComponent.cleanUp();
  }

  removeCardHandler(cardId: string) {
    this.store.dispatch(Actions.removeCard({ id: cardId }));
    this.openSnackbar("Card removed successfully");
  }

  viewTransactionHandler(cardId: string) {
    this.router.navigateByUrl('/dashboard/movements/'+ cardId);
  }

  openSnackbar(dataToShow: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: dataToShow,
      duration: environment.snackBarDuration * 1000,
      panelClass: ['snackbar']
    });
  }


}
