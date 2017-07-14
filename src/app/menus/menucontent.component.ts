import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: "menu-content",
    templateUrl: "menucontent.component.html"
})
export class MenuContent {
    @Input() account: String = "Unauthenticated";
    @Output() logout = new EventEmitter<boolean>();

    signOut() {
        this.logout.emit(true);
    }
}