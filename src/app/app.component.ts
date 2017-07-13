import { Component } from '@angular/core';
import { MdSidenavModule } from '@angular/material';
import { AuthService } from './_services/auth.service'
import { UserModel } from "app/_models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'Reprompt';
  user: UserModel
  firstName: String = "User"
  surName: String = ""
  auth: Boolean = false;

  constructor(private service: AuthService) {
    this.auth = service.isAuthenticated()
    this.user = service.getCurrentUser()
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
