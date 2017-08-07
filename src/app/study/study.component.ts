import { Component } from "@angular/core"
import { StudyService } from "app/_services/study.service";

@Component({
    selector: 'study',
    templateUrl: 'study.component.html',
    providers: [StudyService]
})
export class StudyComponent {
    loading: boolean = false

    constructor(private service: StudyService) {

    }

}