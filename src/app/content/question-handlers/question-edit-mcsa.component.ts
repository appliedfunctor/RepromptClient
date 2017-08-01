import { Component, Input } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionHandler } from "app/_models/question-handler.type";
import { AnswerModel } from "app/_models/answer.model";
import { QuestionModel } from "app/_models/question.model";


@Component({
    selector: 'question-edit-mcsa',
    templateUrl: 'question-edit-mcsa.component.html'
})
export class QuestionEditMCSA implements QuestionHandler {
    @Input() contentItem: ContentItemModel
    @Input() question: QuestionModel = new QuestionModel({})
    questionText: string
    correctAnswer: AnswerModel = new AnswerModel({correct: true})
    distractors: AnswerModel[] = [new AnswerModel({correct: false})]

    constructor(private service: ContentPackageService) { }

    ngOnInit() {
        console.log("Data: " + JSON.stringify(this.contentItem))
    }

    addDistractor() {
        this.distractors.push(new AnswerModel({}))
    }

    removeDistractor() {
        if(this.distractors.length > 1) {
            this.distractors.pop()
        }
    }

}