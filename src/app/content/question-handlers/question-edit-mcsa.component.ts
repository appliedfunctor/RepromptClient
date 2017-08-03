import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service"
import { ContentItemModel } from "app/_models/content-item.model"
import { QuestionHandler } from "app/_models/question-handler.type"
import { AnswerModel } from "app/_models/answer.model"
import { QuestionModel } from "app/_models/question.model"
import { FormBuilder, FormGroup, FormControl, Form, Validators } from "@angular/forms"


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
    formVisible: boolean = true
    active: boolean = true
    loading: boolean = false

    frmQuestion: FormControl
    frmCorrectAnswer: FormControl

    constructor(private service: ContentPackageService) { }

    ngOnInit() {
        this.init()
    }

    init() {
        this.initialiseQuestion()
        this.initialiseAnswers()
    }

    initialiseQuestion() {
        //if(this.question.format == null) this.question.format = 'MCSA'
        if(this.question.itemId == null) this.question.itemId = this.contentItem.id
    }

    initialiseAnswers() {
        if(this.question.answers.length < 1) {
            this.initialiseCorrectAndDistractor()
        } else if(this.question.answers.length < 2) {
            this.initialiseDistractor()
        } else if(!this.question.answers[0].correct){
            this.reorderOrInitialiseAnswers()
        }
        this.setAnswersForEditAndDisplay()
    }

    setAnswersForEditAndDisplay() {
        this.correctAnswer = this.question.answers[0]
        this.distractors = []
        this.question.answers.forEach(ans => {
            if(!ans.correct) {
                this.distractors.push(ans)
            }
        })
    }

    initialiseCorrectAndDistractor() {
        this.question.answers[0] = new AnswerModel({correct: true})
        this.question.answers[1] = new AnswerModel({correct: false})
    }

    initialiseDistractor() {
        this.correctAnswer = this.question.answers[0]
        this.question.answers[1] = new AnswerModel({correct: false})
    }

    reorderOrInitialiseAnswers() {
        let correct = this.question.answers.find(ans => ans.correct)
        if(!correct || correct == null) {
            correct = new AnswerModel({correct: true})
        }
        let others = this.question.answers.filter(ans => ans.id != correct.id)
        others.forEach(ans => ans.correct = false)
        this.question.answers = new Array<AnswerModel>()
        this.question.answers.push(correct)
        others.forEach(ans => this.question.answers.push(ans))
        this.distractors = others
    }

    trackByIndex(index: number, distractor: AnswerModel): number { return index }

    addDistractor() {
        this.distractors.push(new AnswerModel({}))
    }

    removeDistractor() {
        if(this.distractors.length > 1) {
            let toDelete = this.distractors.pop()
            if(toDelete.id && toDelete.id > 0) {
                this.answerDeletions.push(toDelete)
            }
        }
    }

    submit() {
        this.loading = true
        //collate data together into model
        this.question.format = 'MCSA'
        this.question.itemId = this.contentItem.id
        
        console.log('deletions:')
        //delete any pending deleted answers
        this.answerDeletions.forEach(ans => {

            console.log('--' + ans.answer)

            this.service.deleteAnswer(ans.id)
            .takeWhile(() => this.active)
            .subscribe(res => {
                //do nothing
                console.log(res)
            })
        })

        this.question.answers = [this.correctAnswer]
        this.distractors.forEach(d => this.question.answers.push(d))

        //send model to write
        this.service.saveQuestion(this.question)
        .takeWhile(() => this.active)
        .subscribe(res => {
            this.loading = false
            this.saved.emit(res)
        })

    }

    onDataChanged() {
        if(this.question.question == '' && this.question.answers.length < 1) this.formVisible = false
        setTimeout(() => {
            if(this.question.question == '' && this.question.answers.length < 1) this.formVisible = true
            this.initialiseAnswers()
        })     
    }

    ngOnDestroy() {
        this.active = false
    }

}