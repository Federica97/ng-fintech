import {createFeature, createReducer, on} from '@ngrx/store';
import {Contact} from "../../../../models/contact";
import {
  addContactSuccess,
  editContactSuccess,
  getContactsSuccess,
  removeContactsSuccess
} from "./contacts.actions";

export interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: []
}


export const contactsReducer = createReducer(
  initialState,
  on(getContactsSuccess, (state, action) => {
    return {
      ...state,
      contacts: action.contacts
    }
  }),
  on(addContactSuccess, (state, action) => {
    return {
      ...state,
      contacts: [...state.contacts, action.contact]
    }
  }),
  on(removeContactsSuccess, (state, action) => {
    return {
      ...state,
      contacts: state.contacts.filter(c => c._id !== action.id)
    }
  }),
  on(editContactSuccess, (state, action) => {
    return {
      ...state,
      contacts: state.contacts.map(contact => {
        if (contact._id === action.contact._id) {
          return action.contact;
        }
        return contact;
      })
    }}),
)


export const contactsFeature = createFeature({
  name: 'contacts',
  reducer: contactsReducer,
});
