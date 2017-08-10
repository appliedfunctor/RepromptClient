import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";
import { EventEmitter } from "@angular/core";

export interface QuestionEditor {
    contentItem: ContentItemModel
    question: QuestionModel
    saved: EventEmitter<QuestionModel>

    onDataChanged()
}