import { ScoreModel } from "app/_models/score.model";
import { QuestionModel } from "app/_models/question.model";

export class ContentItemModel {
    id: number
    packageId: number
    imageUrl: string
    image
    name: string
    content: string
    enabled: boolean
    questions: QuestionModel[]
    score: ScoreModel

    constructor(data) {
        this.id = data.id ? data.id : null
        this.packageId = data.packageId ? data.packageId : null
        this.imageUrl = data.imageUrl ? data.imageUrl : ""
        this.image = data.image ? data.image : null
        this.name = data.name ? data.name : ""
        this.content = data.content ? data.content : ""
        this.enabled = data.enabled ? data.enabled : true
        this.questions = data.questions ? data.questions : []
        this.score = data.score ? data.score : null
    }

    static sortByName(a: ContentItemModel, b: ContentItemModel) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }
}