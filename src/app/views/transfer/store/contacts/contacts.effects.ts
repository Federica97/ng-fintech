import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";
import {TransferService} from "../../../../api/transfer.service";
import {
  addContact,
  addContactFail,
  addContactSuccess, editContact, editContactFail, editContactSuccess,
  getContacts,
  getContactsFail,
  getContactsSuccess,
  removeContacts,
  removeContactsFail,
  removeContactsSuccess
} from "./contacts.actions";
import {ContactForm} from "../../../../models/contact-form";

@Injectable()
export class ContactsEffects {

  constructor(
    private actions: Actions,
    private transferService: TransferService
  ) {
  }

  getContacts$ = createEffect(() => this.actions.pipe(
    ofType(getContacts),
    switchMap(() => this.transferService.getContacts().pipe(
      map(contacts => getContactsSuccess({contacts})),
      catchError(() => of(getContactsFail()))
    )),
  ))

  addContact$ = createEffect(() => this.actions.pipe(
    ofType(addContact),
    mergeMap(action => {
      const contact: ContactForm = {
        name: action.contact.name,
        surname: action.contact.surname,
        iban: action.contact.iban
      }
      return this.transferService.addContact(contact).pipe(
        map(contact => addContactSuccess({ contact })),
        catchError(() => of(addContactFail()))
      )
    })
  ))

  removeContact$ = createEffect(() => this.actions.pipe(
    ofType(removeContacts),
    mergeMap(({ id }) => {
      return this.transferService.deleteContact(id).pipe(
        map(() => removeContactsSuccess({ id })),
        catchError(() => of(removeContactsFail()))
      )
    }),
  ))

  editContact$ = createEffect(() => this.actions.pipe(
    ofType(editContact),
    mergeMap(action => {
      const contact: ContactForm = {
        name: action.contact.name,
        surname: action.contact.surname,
        iban: action.contact.iban
      }
      return this.transferService.putContact(action.id, contact).pipe(
        map(contact => editContactSuccess({ contact })),
        catchError(() => of(editContactFail()))
      )
    })
  ))

}
