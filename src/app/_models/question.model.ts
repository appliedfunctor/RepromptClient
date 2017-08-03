import { AnswerModel } from "app/_models/answer.model";

export class QuestionModel {
    id: number
    question: string
    format: string
    itemId: number
    answers: AnswerModel[]

    constructor(data) {
        this.id = data.id ? data.id : null
        this.question = data.question ? data.question : ""
        this.format = data.format ? data.format : "MCSA"
        this.itemId = data.itemId ? data.itemId : null
        this.answers = data.answers ? data.answers : []
        //this.answers = data.answers ? data.answers.map(a => new AnswerModel(a)) : []
    }

    static sortByQuestion(a: QuestionModel, b: QuestionModel) {
        if(a.question > b.question) { return 1 }
        if(a.question < b.question) { return -1 }
        return 0
    }
}