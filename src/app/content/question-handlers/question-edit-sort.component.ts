import { Component, Input } from "@angular/core"
import { QuestionHandler } from "app/_models/question-handler.type";


@Component({
    selector: 'question-edit-sort',
    templateUrl: 'question-edit-sort.component.html'
})
export class QuestionEditSort implements QuestionHandler {
    @Input() data
    constructor() { }

}