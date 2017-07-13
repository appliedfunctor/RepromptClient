import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service'

@Component({
    selector: 'auth',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})
export class LoginComponent {
    public error: Boolean = false
    public email: String = "a@b";
    public password: String = "1";
    public response: Object = {}

    constructor(private router: Router, private service: AuthService) {
    }

    submit() {
        //console.log("email: " + this.email + ", pw: " + this.password)
        this.service.login(this.email, this.password).subscribe(data => this.response = data);
        if(Object.keys(this.response).length !== 0) {
            this.router.navigate(['/']);
        } else {
            this.error = true
        }
    }

    redirect(location: String) {
        let link = [location];
        this.router.navigate(link);
    }
}