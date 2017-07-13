import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service'
import { ErrorMessage } from "app/_models/error.model";

@Component({
    selector: 'auth',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})
export class LoginComponent {
    public error: Boolean = false
    public errorMessage: String = "There has been an error attempting to authenticate you."
    public email: String = "";
    public password: String = "";
    public response;

    constructor(private router: Router, private service: AuthService) {
    }

    submit() {
        this.service.login(this.email, this.password).subscribe(data => {

            this.response = data
            this.errorMessage = data.hasOwnProperty('error') ? data.error : "There has been an error attempting to authenticate you."            

            if(data.hasOwnProperty("id")) {
                this.error = false
                this.router.navigate(['/']);
            } else {
                this.error = true
            }
            
        });
        
    }

    redirect(location: String) {
        let link = [location];
        this.router.navigate(link);
    }
}