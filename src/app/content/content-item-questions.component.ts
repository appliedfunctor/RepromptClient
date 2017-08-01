import { Component, Input, Output, EventEmitter } from "@angular/core"
import { ContentItemModel } from "app/_models/content-item.model";
import { ContentPackageService } from "app/_services/content-package.service";
import { QuestionModel } from "app/_models/question.model";

@Component({
    selector: 'content-item-questions',
    templateUrl: 'content-item-questions.component.html'
})
export class ContentItemQuestionsComponent {
    @Input() currentData: ContentItemModel = new ContentItemModel({})
    @Output() questionSelected = new EventEmitter<QuestionModel>()
    currentQuestion = new QuestionModel({})

    loading = false
    active: boolean = true

    constructor(private service: ContentPackageService) {

    }
    
    ngOnChanges(changes) {      
        //load question data
        this.loadQuestions()
    }

    ngOnDestroy() {
        this.active = false
    }

    loadQuestions() {
        this.loading = true
        this.service.getItem(this.currentData.id)
        .takeWhile(() => this.active)
        .subscribe( res => {
            this.currentData = res
            this.loading = false
        })
        
    }

    selectQuestion(question: QuestionModel) {
        this.currentQuestion = question
        this.questionSelected.emit(question)
    }

    deleteQuestion(question: QuestionModel) {
        this.service.deleteQuestion(question.id)
        .takeWhile(() => this.active)
        .subscribe(res => {
            if(res > 0) {
                this.currentData.questions.filter(q => q.id != question.id)
            }
        })
    }
}