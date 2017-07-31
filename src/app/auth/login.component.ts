import { Component, Output, EventEmitter } from '@angular/core'
import { AuthService } from '../_services/auth.service'
import { ErrorMessage } from "app/_models/error.model"
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EqualValidator } from "app/validators/equal-validator.directive"
import { UserModel } from "app/_models/user.model";

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup
    error: Boolean = false
    errorMessage: String = "There has been an error attempting to authenticate you."
    email: String = ""
    password: String = ""
    response;    
    loading: boolean = false;
    alive: boolean = true
    @Output() tab = new EventEmitter<number>()    

    constructor(private fb: FormBuilder, private service: AuthService) {
        this.loginForm = fb.group({
            'email' : [null, Validators.compose(
                [
                    Validators.required,
                    Validators.email
                ]
            )],
            'password' : [null, Validators.compose(
                [
                    Validators.required, 
                    Validators.minLength(30), 
                    Validators.maxLength(500)
                ]
            )]
        });
    
    }

    //application lifecycle preventing memory leaks http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    //accessed 31/07/2017
    ngOnDestroy() {
        this.alive = false
    }

    submit() {
        this.loading = true
        this.service.login(this.email, this.password)
        .takeWhile(() => this.alive)
        .subscribe(data => {

            this.response = data
            this.errorMessage = data.hasOwnProperty('error') ? data.error : "There has been an error attempting to authenticate you."            

            if(data.hasOwnProperty("id")) {
                this.error = false
            } else {
                this.error = true
            }
            this.loading = false
            
        });        
    }

    switchTab() {
        this.tab.emit(1);
    }
}