import { Component, ViewChild, Output, EventEmitter } from "@angular/core"
import { AuthService } from "../_services/auth.service"
import { Router } from "@angular/router"
import { UserModel } from "app/_models/user.model"
import { EqualValidator } from "app/validators/equal-validator.directive"


@Component({
    selector: "register",
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
     @ViewChild('registerForm') registerForm: HTMLFormElement;
    disabled: boolean = true;
    firstName: string = ""
    surName: string = ""
    email: string = ""
    emailVerify: string = ""
    password: string = ""
    passwordVerify: string = ""
    errorMessage: string = "There has been an error attempting to authenticate you."
    response
    error: boolean = false
    isEducator: string = "false"
    loading: boolean = false;
    @Output() tab = new EventEmitter<number>()

    constructor(private router: Router, private service: AuthService) {
    }

    submit() {
        this.loading = true
        let user: UserModel = new UserModel({
            firstName: this.firstName,
            surName: this.surName,
            email: this.email,
            password: this.password,
            isEducator: this.isEducator
        })

        this.service.register(user).subscribe(data => {

            this.response = data
            this.errorMessage = data.hasOwnProperty('error') ? data.error : "There has been an error attempting to register you."            

            if(data.hasOwnProperty("id")) {
                this.error = false
            } else {
                this.error = true
            }

            console.log(data)
            this.loading = false
            
        });  
    }

    switchTab() {
        this.tab.emit(0);
    }

}