import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

//md imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';
import { MdSidenavModule, MdInputModule, MdListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { SideMenu } from './includes/sidemenu.component';
import { AuthGuard } from './_guards/auth.guard';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SideMenu
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    FormsModule,
    MdSidenavModule,
    MdInputModule,
    MdListModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    LoginComponent,
    HomeComponent  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
