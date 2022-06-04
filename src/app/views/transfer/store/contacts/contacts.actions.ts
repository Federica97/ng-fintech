import {createAction, props} from "@ngrx/store";
import {Contact} from "../../../../models/contact";
import {ContactForm} from "../../../../models/contact-form";


/**
 * GET
 */
export const getContacts = createAction('[Transfer Contact] get');

export const getContactsSuccess = createAction('[Transfer Contact] get success',
  props<{ contacts: Contact[] }>()
);

export const getContactsFail = createAction('[Transfer Contact] get fail');


/**
 * ADD
 */
export const addContact = createAction('[Transfer Contact] add',
  props<{ contact: ContactForm}>()
);

export const addContactSuccess = createAction('[Transfer Contact] add success',
  props<{ contact: Contact }>()
);

export const addContactFail = createAction('[Transfer Contact] add fail');



/**
 * REMOVE
 */
export const removeContacts = createAction('[Transfer Contact] remove',
  props<{ id: string }>()
)

export const removeContactsSuccess = createAction('[Transfer Contact] remove success',
  props<{ id: string }>()
)

export const removeContactsFail = createAction('[Transfer Contact] remove fail')



/**
 * EDIT
 */
export const editContact = createAction('[Transfer Contact] edit',
  props<{ id: string, contact: ContactForm}>()
);

export const editContactSuccess = createAction('[Transfer Contact] edit success',
  props<{ contact: Contact }>()
);

export const editContactFail = createAction('[Transfer Contact] edit fail');




