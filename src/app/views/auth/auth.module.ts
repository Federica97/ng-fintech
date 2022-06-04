import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login.component';
import {MaterialModule} from "../../shared/material/material.module";

import { LoginGridComponent } from './components/login-grid.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LoginGridComponent
  ],
  exports: [
    LoginComponent,
    LoginComponent,
    LoginGridComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
