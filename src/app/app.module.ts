import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';
import { MaterialModule } from './material.module';
import { MainComponent } from './main/main.component'
import { FormsModule } from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'YYYY/MM/DD', // this is how your date will be parsed from Input
        },
        display: {
          dateInput: 'YYYY/MM/DD', // this is how your date will get displayed on the Input
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
