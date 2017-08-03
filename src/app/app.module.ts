import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http'

//md imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import 'hammerjs';
import {  MdButtonModule, MdCheckboxModule, MdSidenavModule, MdInputModule, MdListModule, 
          MdMenuModule, MdToolbarModule, MdIconModule, MdTabsModule, MdRadioModule, 
          MdProgressSpinnerModule, MdDialogModule, MdAutocompleteModule, MdCardModule,
          MdSelectModule} from '@angular/material'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './auth/login.component'
import { RegisterComponent } from './auth/register.component'
import { CohortsComponent } from 'app/cohorts/cohorts.component'


import { AuthComponent } from './auth/auth.component'
import { MenuContent } from './menus/menucontent.component'
import { AuthGuard } from './_guards/auth.guard'
import { EducatorGuard } from './_guards/educator.guard'
import { StudentGuard } from './_guards/student.guard'
import { UnauthGuard } from './_guards/unauth.guard'
import { routing } from './app.routing'
import { AuthService } from "./_services/auth.service"
import { SideMenu } from "./menus/sidemenu.component"
import { EqualValidator } from "./_directives/equal-validator.directive"
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt'
import { Http, RequestOptions } from '@angular/http'
import { ContentComponent } from "app/content/content.component"
import { FileNavigationComponent } from 'app/file/file-navigation.component'
import { PackageComponent } from "app/content/package.component"
import { DeleteConfirmDialog } from "app/dialogs/delete-confirm.dialog"
import { UnlinkConfirmDialog } from "app/dialogs/unlink-confirm.dialog"
import { NameEditComponent } from 'app/widgets/name-edit.component'
import { ContentItemEditComponent } from 'app/content/content-item-edit.component'
import { FileUploadModule, EditorModule, TabViewModule } from 'primeng/primeng'
import { ContentItemCardComponent } from "app/content/content-item-card.component"
import { ContentItemQuestionEditComponent } from "app/content/content-item-question-edit.component"
import { ContentItemQuestionsComponent } from "app/content/content-item-questions.component"
import { QuestionEditMCSA } from "app/content/question-handlers/question-edit-mcsa.component"
import { QuestionEditSort } from "app/content/question-handlers/question-edit-sort.component"
import { DragulaModule } from 'ng2-dragula'

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
    FileNavigationComponent,
    ContentItemEditComponent,
    ContentItemCardComponent,
    ContentItemQuestionEditComponent,
    ContentItemQuestionsComponent,
    ContentComponent,
    PackageComponent,
    DeleteConfirmDialog,
    UnlinkConfirmDialog,
    NameEditComponent,
    RegisterComponent,
    MenuContent,
    SideMenu,
    EqualValidator,
    QuestionEditMCSA,
    QuestionEditSort
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    EditorModule,
    TabViewModule,
    MdButtonModule,
    MdCheckboxModule,
    FormsModule,
    MdSidenavModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdTabsModule,
    MdRadioModule,
    MdToolbarModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdCardModule,
    HttpModule,
    JsonpModule,
    DragulaModule,
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
  entryComponents: [
    DeleteConfirmDialog,
    UnlinkConfirmDialog,
    QuestionEditMCSA,
    QuestionEditSort
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
