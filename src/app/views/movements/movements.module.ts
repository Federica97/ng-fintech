import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MovementsRoutingModule} from './movements-routing.module';
import {MovementsComponent} from './movements.component';
import {MovementComponent} from './components/movement.component';
import {MaterialModule} from "../../shared/material/material.module";
import {SharedModule} from "../../shared/shared.module";
import {MovementsService} from "../../api/movements.service";
import {HttpClientModule} from "@angular/common/http";
import {CardsService} from "../../api/cards.service";


@NgModule({
  declarations: [
    MovementsComponent,
    MovementComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  providers: [MovementsService, CardsService]
})
export class MovementsModule {
}
