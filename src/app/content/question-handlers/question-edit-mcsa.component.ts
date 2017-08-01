import { Component, Input, Output, EventEmitter } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionHandler } from "app/_models/question-handler.type";
import { AnswerModel } from "app/_models/answer.model";
import { QuestionModel } from "app/_models/question.model";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";


@Component({
    selector: 'question-edit-mcsa',
    templateUrl: 'question-edit-mcsa.component.html'
})
export class QuestionEditMCSA implements QuestionHandler {
    @Input() contentItem: ContentItemModel
    @Input() question: QuestionModel = new QuestionModel({})

    @Output() saved = new EventEmitter<QuestionModel>()

    questionText: string
    correctAnswer: AnswerModel = new AnswerModel({correct: true})
    distractors: AnswerModel[] = [new AnswerModel({correct: false})]
    answerDeletions: AnswerModel[] = []
    active: boolean = true
    loading: boolean = false

    constructor(private service: ContentPackageService) { }

    ngOnInit() {
        console.log("Data: " + JSON.stringify(this.contentItem))
    }

    trackByIndex(index: number, distractor: AnswerModel): number { return index }

    addDistractor() {
        this.distractors.push(new AnswerModel({}))
        this.distractors.forEach(d => console.log(d.answer))
        this.raiseChangeEventsOnDistractors()
    }

    removeDistractor() {
        if(this.distractors.length > 1) {
            let toDelete = this.distractors.pop()
            if(toDelete.id && toDelete.id > 0) {
                this.answerDeletions.push(toDelete)
            }
        }
        this.distractors.forEach(d => console.log(d.answer))
    }

    raiseChangeEventsOnDistractors() {
        this.distractors.forEach(d => d.answer = d.answer)
    }

    submit() {
        this.loading = true
        //collate data together into model
        this.question.answers = this.distractors.slice(0)
        this.question.answers.push(this.correctAnswer)
        this.question.format = 'MCSA'
        this.question.itemId = this.contentItem.id

        //delete any pending deleted answers
        this.answerDeletions.forEach(ans => {
            this.service.deleteAnswer(ans.id)
            .takeWhile(() => this.active)
            .subscribe(res => {
                //do nothing
                console.log(res)
            })
        })

        console.log('Sending: ' + JSON.stringify(this.question))

        //send model to write
        this.service.saveQuestion(this.question)
        .takeWhile(() => this.active)
        .subscribe(res => {
            this.loading = false
            console.log(res)
            this.saved.emit(res)
        })

    }

    ngOnChange() {

    }

    ngOnDestroy() {
        this.active = false
    }

}