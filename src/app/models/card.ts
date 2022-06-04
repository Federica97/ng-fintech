import {Movement} from "./movement";

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: 'visa' | 'mastercard';
  amount: number;
}
