import { Component, Input } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionHandler } from "app/_models/question-handler.type";


@Component({
    selector: 'question-edit-mcsa',
    templateUrl: 'question-edit-mcsa.component.html'
})
export class QuestionEditMCSA implements QuestionHandler {
    @Input() data: ContentItemModel

    constructor(private service: ContentPackageService) { }

    ngOnInit() {
        console.log("Data: " + JSON.stringify(this.data))
    }

}