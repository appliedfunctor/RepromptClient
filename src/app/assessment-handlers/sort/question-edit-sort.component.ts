import { Component, Input, Output, EventEmitter } from "@angular/core"
import { QuestionEditor } from "app/_models/question-editor.type"
import { ContentItemModel } from "app/_models/content-item.model"
import { QuestionModel } from "app/_models/question.model"
import { DragulaService } from "ng2-dragula"
import { AnswerModel } from "app/_models/answer.model"
import { ContentPackageService } from "app/_services/content-package.service"
import { Mobile } from "app/libs/Mobile";


@Component({
    selector: 'question-edit-sort',
    templateUrl: 'question-edit-sort.component.html',
    providers: [Mobile]
})
export class QuestionEditSort implements QuestionEditor {
    @Input() contentItem: ContentItemModel
    @Input() question: QuestionModel
    @Output() saved = new EventEmitter<QuestionModel>()

    error: boolean = false
    errorMessage = ''
    active: boolean = true
    newElement: string = ''
    items: string[] = []
    loading = false
    answerDeletions: AnswerModel[] = []

    constructor(private dragulaService: DragulaService, private service: ContentPackageService, private mobileLibs: Mobile) {
        let bag: any = this.dragulaService.find('first-bag')
        if (bag !== undefined ) this.dragulaService.destroy('first-bag')
        dragulaService.setOptions('first-bag', {
            removeOnSpill: true
        })

        dragulaService.removeModel.takeWhile( () => this.active ).subscribe( value => {
            this.onRemoveItem(value.slice(1))
        })

        dragulaService.drag.takeWhile( () => this.active ).subscribe( value => {
            this.mobileLibs.preventMobileScreenDrag()
        })

        dragulaService.drop.takeWhile( () => this.active ).subscribe( value => {
            this.mobileLibs.enableMobileScreenDrag()
        })
    }

    

    ngOnInit() {
        this.init()
    }

    ngOnDestroy() {
        this.active = false
    }

    init() {
        this.initialiseQuestion()
        this.initialiseAnswers()
    }

    initialiseQuestion() {
        if(this.question.format != 'SORT') this.question.format = 'SORT'
        if(this.question.itemId == null) this.question.itemId = this.contentItem.id
    }

    initialiseAnswers() {
        this.items = this.question.answers.sort(AnswerModel.sortBySequence).map(ans => ans.answer).filter(ans => ans != '')
    }

    addItem() {
        if( this.newElement != '' && this.items.findIndex(e => e == this.newElement) < 0) {
            this.items.push(this.newElement)
            this.newElement = ''
        }
    }

    onRemoveItem(dragArgs) {
        let [el, source] = dragArgs
        let found = this.question.answers.find(ans => ans.answer == el.innerHTML && ans.id > 0)
        if(found) { this.answerDeletions.push(found) }
    }

    onDataChanged() {
        this.initialiseQuestion()
        this.initialiseAnswers()
    }

    submit() {
        if (this.question.question == '') {
            this.errorMessage = 'You must provide a question'
            this.error = true
        } else if(this.items.length < 2) {
            this.errorMessage = 'You need at least two items to order'
            this.error = true
        } else {
            this.items.forEach((element, index) => {
                console.log(`[${index}] ${element}`)                
            })
            this.saveQuestion()
        }
    }

    saveQuestion() {
        this.loading = true
        //collate data together into model
        this.question.format = 'SORT'
        this.question.itemId = this.contentItem.id
        
        //console.log('deletions:')
        //delete any pending deleted answers
        this.answerDeletions.forEach(ans => {

            //console.log('--' + ans.answer)

            this.service.deleteAnswer(ans.id)
            .takeWhile(() => this.active)
            .subscribe(res => {
                //do nothing
                this.answerDeletions = []
            })
        })

        this.buildAnswers()

        //send model to write
        this.service.saveQuestion(this.question)
        .takeWhile(() => this.active)
        .subscribe(res => {
            this.loading = false
            this.saved.emit(res)
        })
    }

    buildAnswers() {
        //remove answers not in list
        let oldAnswers = this.question.answers
        this.question.answers = []
        //rebuild answers
        this.items.forEach((item, index) => this.question.answers.push(new AnswerModel({
            id: oldAnswers.find(ans => ans.answer == item) ? oldAnswers.find(ans => ans.answer == item).id : null,
            questionId: this.question.id,
            answer: item,
            correct: false,
            sequence: index
        })))
    }


}