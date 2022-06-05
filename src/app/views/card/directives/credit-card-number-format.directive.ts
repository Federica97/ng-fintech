import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[acCreditCardNumberFormat]'
})
export class CreditCardNumberFormatDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let creditCardNumber = input.value.replace(/\s+/g, '');

    let numbers = [];
    for (let i = 0; i < creditCardNumber.length; i += 4) {
      numbers.push(creditCardNumber.substr(i, 4));
    }

    input.value = numbers.join(' ');
  }
}
