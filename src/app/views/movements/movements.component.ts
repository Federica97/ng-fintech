import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Card} from "../../models/card";
import {Store} from "@ngrx/store";
import {MovementsService} from "../../api/movements.service";
import {Movement} from "../../models/movement";
import {CardsService} from "../../api/cards.service";

@Component({
  selector: 'ac-movements',
  template: `
    <div class="container-fluid mt-5">

      <!-- SELECT INPUT -->
      <div>
        <mat-form-field appearance="outline">
          <mat-label>Select a Card</mat-label>
          <mat-select [value]="selectedCardId$ | async" (valueChange)="onCardChange($event)">
            <mat-option
              *ngFor="let card of (cards$ | async)" [value]="card._id"
            >
              {{card.number}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <h1 *ngIf="!(selectedCardId$ | async)" class="mat-h1 text-center"><strong>Please select a Card to see its
        movements</strong></h1>
      <h1 *ngIf="selectedCardId$ | async" class="mat-h1"><strong>Balance: {{balance$ | async}} €</strong></h1>


      <!-- MOVEMENTS LIST-->
      <div *ngFor="let movement of (movements$ | async)" class="my-3">
        <ac-movement
          [date]="movement.timestamp | date:'dd/MM/yyyy'"
          [amount]="movement.amount"
          [type]="movement.type"
          [title]="movement.title"
          [description]="movement.description"
        >
        </ac-movement>
      </div>

      <button *ngIf="selectedCardId$ | async" mat-stroked-button class="element-full-width">Load more</button>
    </div>

  `,
  styles: [],
})
export class MovementsComponent implements OnInit {
  cards$: Observable<Card[]> = new BehaviorSubject([]);
  movements$: Observable<Movement[] | null> = new BehaviorSubject([]);
  balance$: Observable<number | undefined> = new BehaviorSubject(0);

  selectedCardId$ = new BehaviorSubject('');

  selectedCard$ = combineLatest([
    this.cards$,
    this.selectedCardId$,
  ]).pipe(
    map(([cards, cardId]) => cards.find(c => c._id === cardId)),
  );

 onCardChange(cardId: string) {
    this.selectedCardId$.next(cardId);

    this.movements$ = this.movementsService.getMovements(cardId).pipe(
      map(obj => obj.data )
    )

    this.balance$ = this.movements$.pipe(
      map(movements => movements?.reduce((tot, item) => tot + item.amount,0))
    );
  }

  constructor(private store: Store, private movementsService: MovementsService, private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cards$ = this.cardsService.getCards();
  }

}
