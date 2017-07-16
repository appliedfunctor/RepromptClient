import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'

//md imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MdButtonModule, MdCheckboxModule} from '@angular/material'
import 'hammerjs';
import { MdSidenavModule, MdInputModule, MdListModule, MdMenuModule, MdToolbarModule, MdIconModule, MdTabsModule, MdRadioModule } from '@angular/material'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './auth/login.component'
import { RegisterComponent } from './auth/register.component'
import { CohortsComponent } from 'app/cohorts/cohorts.component'
import { CohortsAllComponent }  from "app/cohorts/cohorts-all.component"
import { CohortsCreateComponent }  from "app/cohorts/cohorts-create.component"
import { CohortsPopulateComponent }  from "app/cohorts/cohorts-populate.component"
import { CohortsViewComponent }  from "app/cohorts/cohorts-view.component"


import { AuthComponent } from './auth/auth.component'
import { MenuContent } from './menus/menucontent.component'
import { AuthGuard } from './_guards/auth.guard'
import { EducatorGuard } from './_guards/educator.guard'
import { StudentGuard } from './_guards/student.guard'
import { UnauthGuard } from './_guards/unauth.guard'
import { routing } from './app.routing'
import { AuthService } from "./_services/auth.service"
import { SideMenu } from "./menus/sidemenu.component"
import { EqualValidator } from "./validators/equal-validator.directive"
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'X-Auth-Token',
    headerPrefix: ' ',
    tokenName: 'token',
		tokenGetter: (() => {
            let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
            let jwtToken = loginInfo && loginInfo.token
            return jwtToken
        }),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    CohortsComponent,
    CohortsAllComponent,
    CohortsCreateComponent,
    CohortsPopulateComponent,
    CohortsViewComponent,
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
    MdRadioModule,
    MdToolbarModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    AuthGuard,
    EducatorGuard,
    StudentGuard,
    UnauthGuard,
    LoginComponent,
    HomeComponent,
    AuthService,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
