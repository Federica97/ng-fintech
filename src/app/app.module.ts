import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material/material.module";
import localeIt from "@angular/common/locales/it";
import {registerLocaleData} from "@angular/common";
import {NavigationMenuModule} from "./shared/modules/navigation-menu.module";
import {DashboardModule} from "./views/dashboard/dashboard.module";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HttpClientXsrfModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
registerLocaleData(localeIt)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NavigationMenuModule,
    DashboardModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    })
  ],
  providers: [{provide: LOCALE_ID, useValue: 'it' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
