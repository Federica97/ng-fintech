import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransferRoutingModule} from './transfer-routing.module';
import {TransferComponent} from './transfer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material/material.module";
import {ContactsComponent} from './components/contacts.component';
import {ContactListComponent} from "./components/contact-list.component";
import {DeleteContactModalComponent} from "./components/delete-contact-dialog.component";
import {FilterByTextPipe} from "./pipes/filter-by-text.pipe";
import {ContactFormComponent} from './components/contact-form.component';
import {TransferService} from "../../api/transfer.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {contactsFeature} from "./store/contacts/contacts.reducer";
import {ContactsEffects} from "./store/contacts/contacts.effects";
import {HttpClientModule} from "@angular/common/http";
import {CardsService} from "../../api/cards.service";


@NgModule({
  declarations: [
    TransferComponent,
    ContactsComponent,
    ContactListComponent,
    DeleteContactModalComponent,
    FilterByTextPipe,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    TransferRoutingModule,
    StoreModule.forFeature(contactsFeature),
    EffectsModule.forFeature([ContactsEffects])
  ],
  providers:[TransferService, CardsService]
})
export class TransferModule { }
