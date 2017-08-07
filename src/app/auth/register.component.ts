import { Component, ViewChild, Output, EventEmitter } from "@angular/core"
import { AuthService } from "../_services/auth.service"
import { Router } from "@angular/router"
import { UserModel } from "app/_models/user.model"
import { EqualValidator } from "app/_directives/equal-validator.directive"


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
    alive: boolean = true
    @Output() tab = new EventEmitter<number>()
    @Output() loadingEvent = new EventEmitter<boolean>()

    constructor(private router: Router, private service: AuthService) {
    }

    emitLoading(value: boolean) {
        this.loadingEvent.emit(value)
    }

    submit() {
        this.emitLoading(true)
        let user: UserModel = new UserModel({
            firstName: this.firstName,
            surName: this.surName,
            email: this.email,
            password: this.password,
            isEducator: this.isEducator
        })

        this.service.register(user)
        .takeWhile(() => this.alive)
        .subscribe(data => {

            this.response = data
            this.errorMessage = data.hasOwnProperty('error') ? data.error : "There has been an error attempting to register you."            

            if(data.hasOwnProperty("id")) {
                this.error = false
            } else {
                this.error = true
            }

            this.emitLoading(false)
            
        });  
    }

    switchTab() {
        this.tab.emit(0);
    }

    //application lifecycle preventing memory leaks http://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    //accessed 31/07/2017
    ngOnDestroy() {
        this.alive = false
    }

}