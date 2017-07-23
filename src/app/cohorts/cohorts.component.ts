import { Component } from "@angular/core";
import { FileNavigationComponent } from 'app/file/file-navigation.component';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { CohortService } from "app/_services/cohort.service";


@Component({
    selector: 'cohorts',
    templateUrl: 'cohorts.component.html',
    providers: [CohortService]
})
export class CohortsComponent{ 
    title = "Cohort Management"

    /**
     * Creates an instance of CohortsComponent.
     * @param {CohortService} service 
     * @param {MdDialog} dialog 
     * @param {AuthService} auth 
     * @memberof CohortsComponent
     */
    constructor(private service: CohortService) {
              
    }

    ngOnInit() {

    }

    

}