import { Component, Input, Output, EventEmitter } from "@angular/core"
import { QuestionHandler } from "app/_models/question-handler.type";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";
import { DragulaService } from "ng2-dragula";


@Component({
    selector: 'question-edit-sort',
    templateUrl: 'question-edit-sort.component.html'
})
export class QuestionEditSort implements QuestionHandler {
    @Input() contentItem: ContentItemModel
    @Input() question: QuestionModel
    @Output() saved = new EventEmitter<QuestionModel>()

    newElement: string = ''
    items: string[] = []

    constructor(private dragulaService: DragulaService) {
        dragulaService.setOptions('first-bag', {
            removeOnSpill: true
        });
    }

    addItem() {
        if( this.newElement != '') {
            this.items.push(this.newElement)
            this.newElement = ''
        }
    }

    onDataChanged() {

    }

}