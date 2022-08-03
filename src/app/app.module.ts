import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExchangeCalculatorComponent } from './exchange-calculator/exchange-calculator.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ApiKeyInterceptor } from './api-key.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExchangeCalculatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,  
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
