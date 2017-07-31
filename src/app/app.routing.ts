import { Routes, RouterModule } from '@angular/router'
import { Component } from '@angular/core'
 
//import { LoginComponent } from './login/index'
import { HomeComponent } from './home/home.component'
import { AuthComponent } from './auth/auth.component'
import { AuthGuard } from './_guards/auth.guard'
import { EducatorGuard } from "app/_guards/educator.guard"
import { CohortsComponent } from "app/cohorts/cohorts.component"
import { ContentComponent } from "app/content/content.component";
import { PackageComponent } from "app/content/package.component";

const appRoutes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'cohorts', component: CohortsComponent, canActivate: [EducatorGuard] },
    { path: 'content', component: ContentComponent, canActivate: [EducatorGuard] },
    { path: 'content/:id', component: ContentComponent, canActivate: [EducatorGuard] },
    { path: 'content/package/:id', component: PackageComponent, canActivate: [EducatorGuard] },
    { path: 'users', component: AuthComponent, canActivate: [EducatorGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);