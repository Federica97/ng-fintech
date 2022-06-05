import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './navigation-menu.component';
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";
import {CoreModule} from "../../core/core.module";



@NgModule({
  declarations: [
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    NavigationMenuComponent
  ]
})
export class NavigationMenuModule { }
