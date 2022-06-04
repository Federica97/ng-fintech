import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material/material.module";
import {RouterModule} from "@angular/router";
import { CreditCardNumberFormatDirective } from './directives/credit-card-number-format.directive';



@NgModule({
  declarations: [
    CreditCardNumberFormatDirective
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
    ],
  exports: [
    CreditCardNumberFormatDirective
  ]
})
export class CoreModule { }
