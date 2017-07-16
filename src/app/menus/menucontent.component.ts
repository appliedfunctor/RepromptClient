import { Component, Input, Output, EventEmitter } from '@angular/core'
import { AuthService } from "app/_services/auth.service";
import { UserModel } from "app/_models/user.model";
import { Router } from "@angular/router";

@Component({
    selector: "menu-content",
    templateUrl: "menucontent.component.html"
})
export class MenuContent {
    user: UserModel = new UserModel({})
    authenticated: boolean = false
    @Input() account: String = "Unauthenticated";
    @Output() logout = new EventEmitter<boolean>();

    constructor(private service: AuthService, private router: Router) {
        this.updateData(this.service.getCurrentUser())

        service.userChange.subscribe(u => {
            this.updateData(u)
        })
    }

    updateData(user: UserModel) {
        this.user = user
        this.authenticated = this.service.isAuthenticated()
    }

    signOut() {
        this.logout.emit(true);
    }

    redirect(destination: string) {
        this.router.navigate([destination])
    }
}