import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar.component';
import {MaterialModule} from "./material/material.module";
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterByTextPipe } from '../views/transfer/pipes/filter-by-text.pipe';



@NgModule({
  declarations: [
    SnackbarComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SnackbarComponent,
    TruncatePipe
  ]
})
export class SharedModule { }
