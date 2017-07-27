export class AnswerModel {
    id: number
    questionId: number
    answer: string
    correct: boolean

    constructor(data) {
        this.id = data.id ? data.id : null
        this.questionId = data.questionId ? data.questionId : null
        this.answer = data.answer ? data.answer : ""
        this.correct = data.correct ? data.correct : false
    }
}