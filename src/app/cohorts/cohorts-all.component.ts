import { Component, Output, EventEmitter } from "@angular/core";
import { CohortService } from "app/_services/cohort.service";
import { CohortModel } from "app/_models/cohort.model";

@Component({
    selector: 'cohorts-all',
    templateUrl: 'cohorts-all.component.html',
    providers: [CohortService]
})
export class CohortsAllComponent{
    @Output() tab = new EventEmitter<number>()
    cohorts: CohortModel[] = []

    constructor(private service: CohortService) {
        this.loadData()
    }

    loadData() {
        this.service.getAll().subscribe(res => {
            if (res) {
                this.cohorts = res
            }
        })
    }

    switchTab(tab: number) {
        this.tab.emit(tab)
    }
}