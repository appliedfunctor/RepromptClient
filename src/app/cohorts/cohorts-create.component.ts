import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'cohorts-create',
    templateUrl: 'cohorts-create.component.html'
})
export class CohortsCreateComponent{
    @Output() tab = new EventEmitter<number>()

    switchTab(tab: number) {
        this.tab.emit(tab)
    }
}