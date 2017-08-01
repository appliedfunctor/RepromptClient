import { Component, Input } from "@angular/core"
import { QuestionHandler } from "app/_models/question-handler.type";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";


@Component({
    selector: 'question-edit-sort',
    templateUrl: 'question-edit-sort.component.html'
})
export class QuestionEditSort implements QuestionHandler {
    @Input() contentItem: ContentItemModel
    @Input() question: QuestionModel
    constructor() { }

}