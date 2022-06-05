import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { CardListComponent } from './components/card-list.component';
import {MaterialModule} from "../../shared/material/material.module";
import { CardFormComponent } from './components/card-form.component';
import { ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "../../core/core.module";
import { DeleteCardModalComponent } from './components/delete-card-modal.component';
import {StoreModule} from "@ngrx/store";
import {cardsFeature} from "./store/card.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CardsEffects} from "./store/card.effects";
import {CardsService} from "../../api/cards.service";
import {CreditCardNumberFormatDirective} from "./directives/credit-card-number-format.directive";



@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    CardFormComponent,
    DeleteCardModalComponent,
    CreditCardNumberFormatDirective
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forFeature(cardsFeature),
    EffectsModule.forFeature([CardsEffects])
  ],
  providers: [CardsService]
})
export class CardModule { }
