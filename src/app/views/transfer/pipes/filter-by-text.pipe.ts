import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "../../../models/contact";

@Pipe({
  name: 'filterByText'
})
export class FilterByTextPipe implements PipeTransform {

  transform(contacts: Contact[], text: string) {
    if(text === '') {
      return contacts;
    }

    return contacts.filter(contact => {
      const fullName = contact.name.toLowerCase() + ' ' + contact.surname.toLowerCase();
      const searchedText = text.toLowerCase();
      return contact.name.toLowerCase().includes(searchedText) || contact.surname.toLowerCase().includes(searchedText) ||
        contact.iban.toLowerCase().includes(searchedText) || fullName.includes(searchedText);
    })
  }

}
