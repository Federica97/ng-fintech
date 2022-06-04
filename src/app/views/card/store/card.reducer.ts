import { createFeature, createReducer, on } from '@ngrx/store';
import {Card} from "../../../models/card";
import {addCardSuccess, getCardsSuccess, removeCardSuccess} from "./card.actions";

export interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: []
}


export const cardsReducer = createReducer(
  initialState,
  on(addCardSuccess, (state, action) => {
    return {
      ...state,
      cards: [...state.cards, action.card]
    }
  }),
  on(removeCardSuccess, (state, action) => {
    return {
      ...state,
      cards: state.cards.filter(c => c._id !== action.id)
    }
  }),
  on(getCardsSuccess, (state, action) => {
    return {
      ...state,
      cards: action.cards
    }
  })
)

export const cardsFeature = createFeature({
  name: 'cards',
  reducer: cardsReducer,
});
