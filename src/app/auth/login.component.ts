import { Component, Output, EventEmitter } from '@angular/core'
import { AuthService } from '../_services/auth.service'
import { ErrorMessage } from "app/_models/error.model"
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EqualValidator } from "app/_directives/equal-validator.directive"
import { UserModel } from "app/_models/user.model";
import { Observable } from "rxjs/Rx";
import { NotificationsService } from "angular2-notifications";
import { Settings } from "app/libs/Settings";

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
    response    
    alive: boolean = true
    @Output() tab = new EventEmitter<number>()    
    @Output() loadingEvent = new EventEmitter<boolean>()
    public options = Settings.toastOptions

    constructor(private fb: FormBuilder, private service: AuthService, private notify: NotificationsService) {
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

    emitLoading(value: boolean) {
        this.loadingEvent.emit(value)
    }

    submit() {
        this.emitLoading(true)
        this.service.login(this.email, this.password)
        .takeWhile(() => this.alive)
        .catch( (errMsg) => {
            this.notify.error('Error', errMsg)          
            return Observable.of(null)
        })
        .subscribe((response) => {
            this.response = response
            this.emitLoading(false)
        })   
    }

    switchTab() {
        this.tab.emit(1);
    }
}