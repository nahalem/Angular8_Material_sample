import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './common/shared.modules';
import { MaterialModule } from './common/material.module';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './common/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './common/services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AlertService, UserService],
  exports: [
    SharedModule, MaterialModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
