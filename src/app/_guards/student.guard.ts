import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserModel } from "../_models/user.model";
import { AuthService } from "app/_services/auth.service";

@Injectable()
export class StudentGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) { }

    canActivate() {
        let user = this.auth.getCurrentUser()
        if (this.auth.isAuthenticated() && !user.isEducator) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}