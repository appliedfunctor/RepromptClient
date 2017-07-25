import { AnswerModel } from "app/_models/answer.model";

export class QuestionModel {
    id: number
    question: string
    format: string
    itemId: number
    answers: AnswerModel[]
}