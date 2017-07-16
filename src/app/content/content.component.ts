import { Component } from "@angular/core"
import { CohortsAllComponent }  from "app/cohorts/cohorts-all.component"
import { CohortsCreateComponent }  from "app/cohorts/cohorts-create.component"
import { CohortsPopulateComponent }  from "app/cohorts/cohorts-populate.component"
import { CohortsViewComponent }  from "app/cohorts/cohorts-view.component"

@Component({
    selector: 'content',
    templateUrl: './cohorts.component.html'
})
export class CohortsComponent {

    onSelectChange(event) {
        //console.log(event)
    }
    
}