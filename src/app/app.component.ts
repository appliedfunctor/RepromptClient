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
  alive: boolean = true
  sub

  constructor(private service: AuthService, private router: Router) {    
    
  }

  ngOnInit() {
    this.sub = this.service.userChange
        .subscribe(user => {
          this.user = user
          this.onUserChange()
        })
    this.user = this.service.getCurrentUser()
    this.authenticated = this.service.isAuthenticated()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  logout() {
    this.service.logout()
    this.authenticated = false
    this.router.navigate(['/auth']);
  }

  redirect(destination: string) {
      this.router.navigate([destination])
  }

  onUserChange() {
    this.firstName = this.user.firstName
    this.surName = this.user.surName
    this.authenticated = this.service.isAuthenticated()
    
    if(this.authenticated) {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

}
