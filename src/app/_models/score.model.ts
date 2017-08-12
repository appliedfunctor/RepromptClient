export class ScoreModel {
    userId: number
    contentItemId: number
    score: number
    scoreDate: string
    streak: number
    repromptDate: string

    constructor(data) {
        this.userId = data.userId ? data.userId : null
        this.contentItemId = data.contentItemId ? data.contentItemId : null
        this.score = data.score ? data.score : null
        this.scoreDate = data.scoreDate ? data.scoreDate : null
        this.streak = data.streak ? data.streak : null
        this.repromptDate = data.repromptDate ? data.repromptDate : null
    }
}