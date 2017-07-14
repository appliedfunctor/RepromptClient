import { Component } from '@angular/core';
import { MdSidenavModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { AuthService } from './_services/auth.service'
import { UserModel } from "app/_models/user.model";
import { UserRoles } from './enums/user.roles.enum'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'Reprompt'
  user: UserModel = new UserModel({})
  firstName: String = "Guest"
  surName: String = ""
  auth: boolean = false
  userRole: String = "Unauthenticated"

  constructor(private service: AuthService) {
    this.auth = service.isAuthenticated()
    if(this.auth) { this.user = service.getCurrentUser() }
    if(this.user) {
      this.firstName = this.user.firstName
      this.surName = this.user.surName
    }
  }

  logout() {
    this.service.logout()
    this.auth = false
    this.user = null
  }

}
