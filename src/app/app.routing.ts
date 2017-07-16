import { Routes, RouterModule } from '@angular/router';
 
//import { LoginComponent } from './login/index';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './_guards/auth.guard';
import { CohortsComponent } from "app/cohorts/cohorts.component";
import { EducatorGuard } from "app/_guards/educator.guard";

const appRoutes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'cohorts', component: CohortsComponent, canActivate: [EducatorGuard] },
    { path: 'content', component: AuthComponent, canActivate: [EducatorGuard] },
    { path: 'users', component: AuthComponent, canActivate: [EducatorGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);