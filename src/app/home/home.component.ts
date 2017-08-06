
import { Component } from "@angular/core";
import { AuthService } from "app/_services/auth.service";
import { UserModel } from "app/_models/user.model";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    currentUser: UserModel
    usergroup: string

    constructor(private authService: AuthService) {
        this.currentUser = authService.getCurrentUser()
        this.usergroup = this.currentUser.isEducator ? 'educator' : 'student'
    }
    
}