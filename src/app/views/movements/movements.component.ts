import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, share, switchMap, tap} from 'rxjs';
import {Card} from "../../models/card";
import {MovementsService} from "../../api/movements.service";
import {Movement} from "../../models/movement";
import {CardsService} from "../../api/cards.service";
import {ActivatedRoute, Router} from "@angular/router";

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
      <button *ngIf="shouldLoadMore$ | async" mat-stroked-button class="element-full-width mb-5" (click)="loadMore()">Load
        more
      </button>
    </div>
  `,
  styles: [],
})
export class MovementsComponent implements OnInit {

  cards$ = new BehaviorSubject<Card[]>([]);
  movements$ = new BehaviorSubject<Movement[]>([]);
  total$ = new BehaviorSubject<number>(0);
  selectedCardId$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('cardId'))
  )


  balance$ = this.movements$.pipe(
    map(movements => movements?.reduce((tot, item) => tot + item.amount, 0))
  );

  selectedCard$ = combineLatest([
    this.cards$,
    this.selectedCardId$,
  ]).pipe(
    map(([cards, cardId]) => cards.find(c => c._id === cardId)),
  );

  shouldLoadMore$ = combineLatest([this.movements$, this.total$]).pipe(
    map(([movements, tot]) => {
      return movements.length < tot;
    })
  )

  limit: number = 5;


  constructor(
    private movementsService: MovementsService,
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.selectedCardId$.pipe(
      switchMap((id) => this.movementsService.getMovements(id)),
      share()
    ).subscribe((movements) => {
        this.movements$.next(movements.data);
        this.total$.next(movements.total);
      }
    )
  }

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(cards => this.cards$.next(cards))
  }


  onCardChange(cardId: string) {
    this.router.navigateByUrl('dashboard/movements/'+ cardId);
  }

  loadMore() {
    this.limit = this.limit + 5;

    this.selectedCardId$.pipe(
      switchMap((id) => this.movementsService.getMovements(id, String(this.limit))),
      share()
    ).subscribe((movements) => {
        this.movements$.next(movements.data);
      }
    )

  }


}
