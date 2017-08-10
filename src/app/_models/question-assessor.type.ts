import { QuestionModel } from "app/_models/question.model"
import { EventEmitter } from "@angular/core"

export interface QuestionAssessor {
    question: QuestionModel
    marked: EventEmitter<number>
}


