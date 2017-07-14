import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserModel } from "app/_models/user.model";

@Component({
    selector: 'sidemenu',
    templateUrl: './sidemenu.component.html'
})
export class SideMenu {
    @Input() authenticated: Boolean = false;
    @Input() user: UserModel;
    @Output() logout = new EventEmitter<boolean>();

    signOut() {
        this.logout.emit(true);
    }
}