import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../../auth.module";
import {MaterialModule} from "../../../../shared/material/material.module";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    MaterialModule
  ]
})
export class RegisterModule { }
