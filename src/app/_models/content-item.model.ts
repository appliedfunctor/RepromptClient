import { ScoreModel } from "app/_models/score.model";
import { QuestionModel } from "app/_models/question.model";

export class ContentItemModel {
    id: number
    packageId: number
    imageUrl: string
    image: File
    name: string
    content: string
    questions: QuestionModel[]
    //score: ScoreModel //wrong, separate this out into separate results table

    constructor(data) {
        this.id = data.id ? data.id : null
        this.packageId = data.packageId ? data.packageId : null
        this.imageUrl = data.imageUrl ? data.imageUrl : ""
        this.image = data.image ? data.image : null
        this.name = data.name ? data.name : ""
        this.content = data.content ? data.content : ""
        this.questions = data.questions ? data.questions : []
        //if(this.questions.length > 0) this.questions.map(q => new QuestionModel(q))
        //this.score = data.score ? new ScoreModel(data.score) : null
    }
}