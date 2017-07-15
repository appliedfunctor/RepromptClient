import { Component } from '@angular/core';
import { MdSidenavModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { AuthService } from './_services/auth.service'
import { UserModel } from "app/_models/user.model";
import { UserRoles } from './enums/user.roles.enum'
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reprompt'
  user: UserModel = new UserModel({})
  firstName: String = "Guest"
  surName: String = ""
  auth: boolean = false

  constructor(private service: AuthService, private router: Router) {    
    service.userChange.subscribe(user => {
      this.user = user
      this.onUserChange()
    })
    this.user = service.getCurrentUser()
    this.auth = this.service.isAuthenticated()
  }

  logout() {
    this.service.logout()
    this.auth = false
    this.router.navigate(['/auth']);
  }

  onUserChange() {
    this.firstName = this.user.firstName
    this.surName = this.user.surName
    this.auth = this.service.isAuthenticated()
    
    if(this.auth) {
      this.router.navigate(['/']);
    }
    console.log("Auth "+ this.auth + " User: " + this.user)
  }

}
