import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../../auth.module";
import {MaterialModule} from "../../../../shared/material/material.module";
import {SharedModule} from "../../../../shared/shared.module";


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AuthModule
  ]
})
export class SignInModule { }
