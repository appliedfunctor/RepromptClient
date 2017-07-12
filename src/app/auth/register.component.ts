import { Component } from "@angular/core";

@Component({
    selector: "register",
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public disabled: Boolean

    contructor() {
        this.disabled = true;
    }
}