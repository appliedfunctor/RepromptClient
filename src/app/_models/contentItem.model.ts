import { ScoreModel } from "app/_models/score.model";
import { QuestionModel } from "app/_models/question.model";

export class ContentItemModel {
    id: number
    packageId: number
    imageUrl: string
    name: string
    content: string
    questions: QuestionModel[]
    score: ScoreModel
}