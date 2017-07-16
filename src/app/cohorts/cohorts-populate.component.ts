import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'cohorts-populate',
    templateUrl: 'cohorts-populate.component.html'
})
export class CohortsPopulateComponent{
    @Output() tab = new EventEmitter<number>()

    switchTab(tab: number) {
        this.tab.emit(tab)
    }
}