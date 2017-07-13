import { Component } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public disabled: Boolean
    public email: String
    public password: String

    contructor() {
        this.disabled = true;
    }
}