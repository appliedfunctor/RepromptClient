import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'cohorts-view',
    templateUrl: 'cohorts-view.component.html'
})
export class CohortsViewComponent{
    @Output() tab = new EventEmitter<number>()

    switchTab(tab: number) {
        this.tab.emit(tab)
    }
}