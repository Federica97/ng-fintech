import {createAction, props} from "@ngrx/store";
import {Card} from "../../../models/card";

/**
 * GET
 */
export const getCards = createAction('[Card] get');

export const getCardsSuccess = createAction('[Card] get success',
  props<{ cards: Card[] }>()
);

export const getCardsFail = createAction('[Card] get fail');

/**
 * ADD
 */
export const addCard = createAction('[Card] add',
  props<{ cardType: 'visa' | 'mastercard', name:string, surname:string, number: string, csc:number  }>()
);

export const addCardSuccess = createAction('[Card] add success',
  props<{ card: Card }>()
);

export const addCardFail = createAction('[Card] add fail');

/**
 * REMOVE
 */
export const removeCard = createAction('[Card] remove',
  props<{ id: string }>()
)

export const removeCardSuccess = createAction('[Card] remove success',
  props<{ id: string }>()
)

export const removeCardFail = createAction('[Card] remove fail')
