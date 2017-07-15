import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'

//md imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MdButtonModule, MdCheckboxModule} from '@angular/material'
import 'hammerjs';
import { MdSidenavModule, MdInputModule, MdListModule, MdMenuModule, MdToolbarModule, MdIconModule, MdTabsModule } from '@angular/material'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './auth/login.component'
import { RegisterComponent } from './auth/register.component'
import { AuthComponent } from './auth/auth.component'
import { MenuContent } from './menus/menucontent.component'
import { AuthGuard } from './_guards/auth.guard'
import { routing } from './app.routing'
import { AuthService } from "./_services/auth.service"
import { SideMenu } from "./menus/sidemenu.component"
import { EqualValidator } from "./validators/equal-validator.directive"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    MenuContent,
    SideMenu,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MdSidenavModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdTabsModule,
    MdToolbarModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    AuthGuard,
    LoginComponent,
    HomeComponent,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
