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
  authenticated: boolean = false

  constructor(private service: AuthService, private router: Router) {    
    service.userChange.subscribe(user => {
      this.user = user
      this.onUserChange()
    })
    this.user = service.getCurrentUser()
    this.authenticated = this.service.isAuthenticated()
  }

  logout() {
    this.service.logout()
    this.authenticated = false
    this.router.navigate(['/auth']);
  }

  onUserChange() {
    this.firstName = this.user.firstName
    this.surName = this.user.surName
    this.authenticated = this.service.isAuthenticated()
    
    if(this.authenticated) {
      this.router.navigate(['/'])
    }
    console.log("Auth "+ this.authenticated + " User: " + this.user)
  }

}
