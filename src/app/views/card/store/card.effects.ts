import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CardsService} from "../../../api/cards.service";
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';
import {
  addCard,
  addCardFail,
  addCardSuccess,
  getCards,
  getCardsFail,
  getCardsSuccess,
  removeCard,
  removeCardFail,
  removeCardSuccess
} from "./card.actions";
import {CardForm} from "../../../models/card-form";


@Injectable()
export class CardsEffects {

  constructor(
    private actions: Actions,
    private cardsService: CardsService
  ) {}

  getCards$ = createEffect(() => this.actions.pipe(
    ofType(getCards),
    switchMap(() => this.cardsService.getCards().pipe(
      map(cards => getCardsSuccess({ cards })),
      catchError(() => of(getCardsFail()))
    )),
  ))

  addCard$ = createEffect(() => this.actions.pipe(
    ofType(addCard),
    mergeMap(action => {
      const card: CardForm = {
        type: action.cardType,
        name: action.name,
        surname: action.surname,
        number: action.number,
        csc: action.csc
      }
      return this.cardsService.addCard(card).pipe(
        map(card => addCardSuccess({ card })),
        catchError(() => of(addCardFail()))
      )
    })
  ))

  removeCard$ = createEffect(() => this.actions.pipe(
    ofType(removeCard),
    mergeMap(({ id }) => {
      return this.cardsService.deleteCard(id).pipe(
        map(() => removeCardSuccess({ id })),
        catchError(() => of(removeCardFail()))
      )
    }),
  ))

}
