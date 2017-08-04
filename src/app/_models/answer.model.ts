export class AnswerModel {
    id: number
    questionId: number
    answer: string
    correct: boolean
    sequence: number

    constructor(data) {
        this.id = data.id ? data.id : null
        this.questionId = data.questionId ? data.questionId : null
        this.answer = data.answer ? data.answer : ""
        this.correct = data.correct ? data.correct : false
        this.sequence = data.sequence ? data.sequence : 0
    }

    static sortBySequence(a: AnswerModel, b: AnswerModel) {
        if(a.sequence > b.sequence) { return 1 }
        if (a.sequence < b.sequence) { return -1 }
        return 0
    }
}