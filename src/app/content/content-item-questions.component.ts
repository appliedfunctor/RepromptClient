import { Component, Input, Output, EventEmitter } from "@angular/core"
import { ContentItemModel } from "app/_models/content-item.model"
import { ContentPackageService } from "app/_services/content-package.service"
import { QuestionModel } from "app/_models/question.model"
import { MdDialog } from "@angular/material"
import { UnlinkConfirmDialog } from "app/dialogs/unlink-confirm.dialog"

@Component({
    selector: 'content-item-questions',
    templateUrl: 'content-item-questions.component.html'
})
export class ContentItemQuestionsComponent {
    @Input() currentData: ContentItemModel = new ContentItemModel({})
    @Input() currentQuestion: QuestionModel = new QuestionModel({})
    @Output() questionSelected = new EventEmitter<QuestionModel>()

    loading = false
    active: boolean = true

    constructor(private service: ContentPackageService, public dialog: MdDialog) {

    }
    
    ngOnChanges(changes) {      
        this.currentData.questions.sort(QuestionModel.sortByQuestion)
    }

    ngOnDestroy() {
        this.active = false
    }

    loadQuestions() {
        if(this.currentData && this.currentData.id != null) {
            this.loading = true
            this.service.getItem(this.currentData.id)
            .takeWhile(() => this.active)
            .subscribe( res => {
                this.currentData = res
                this.loading = false
            })
        }
        
    }

    selectQuestion(question: QuestionModel) {
        if(this.currentQuestion.id == question.id) {
            this.newQuestionCreation()
        } else {
            this.currentQuestion = question
            this.emitQuestion()
        }
    }

    verifyDeleteQuestion(question: QuestionModel) {
        let dialogRef = this.dialog.open(UnlinkConfirmDialog)
        dialogRef.componentInstance.item = question.question
        dialogRef.componentInstance.container = this.currentData.name
        dialogRef.componentInstance.action = 'delete'
        dialogRef.afterClosed()
        .takeWhile(() => this.active)
        .subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.deleteQuestion(question.id)
                    .takeWhile(() => this.active)
                    .subscribe(res => {
                        if(res > 0) {
                            this.currentData.questions = this.currentData.questions.filter(q => q.id != question.id)
                            console.log('delete: ' + res)
                        }
                    })
                }
        })
    }

    newQuestionCreation() {
        this.currentQuestion = new QuestionModel({})
        this.emitQuestion()
    }

    emitQuestion() {
        this.questionSelected.emit(this.currentQuestion)
    }
}