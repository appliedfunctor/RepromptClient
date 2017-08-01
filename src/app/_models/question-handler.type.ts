import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";

export interface QuestionHandler {
    contentItem: ContentItemModel
    question: QuestionModel
}