import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserModel } from "../_models/user.model";

@Injectable()
export class StudentGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        let loginInfo = new UserModel(JSON.parse(localStorage.getItem('loginInfo')))
        if (loginInfo && loginInfo.isEducator && loginInfo.isEducator === true) {
            return true;
        }

        if(!loginInfo) {
            this.router.navigate(['/login']);
        }
        return false;
    }
}