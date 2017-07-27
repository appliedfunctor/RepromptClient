export class ScoreModel {
    userId: number
    contentId: number
    lastScore: number
    repromptDate: Date
    streak: number

    constructor(data) {
        this.userId = data.userId ? data.userId : null
        this.contentId = data.contentId ? data.contentId : null
        this.lastScore = data.lastScore ? data.lastScore : null
        this.repromptDate = data.repromptDate ? data.repromptDate : null
        this.streak = data.streak ? data.streak : null
    }
}