import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from "app/_services/auth.service";

@Injectable()
export class UnauthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) { }

    canActivate() {
        if (!this.auth.isAuthenticated()) {
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;
    }
}