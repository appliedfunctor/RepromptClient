import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Component } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service"
import { ContentPackageModel } from "app/_models/content-package.model"
import { ContentItemModel } from "app/_models/content-item.model"
import { AuthService } from "app/_services/auth.service"
import { MdDialog, MdDialogRef, MdAutocompleteModule } from '@angular/material'
import { UnlinkConfirmDialog } from "app/dialogs/unlink-confirm.dialog"
import { QuestionModel } from "app/_models/question.model"
import { Observable } from "rxjs/Rx"
import { NotificationsService } from "angular2-notifications"
import { Settings } from "app/libs/Settings";


@Component({
    selector: 'content-package',
    templateUrl: 'package.component.html',
    providers: [ContentPackageService]
})
export class PackageComponent {

    navigationId = null
    currentPackage: ContentPackageModel = null
    loading = false
    itemCreating = false
    itemEditing = false
    itemAssessment = false
    itemName = 'Content Item'
    currentContentItem: ContentItemModel = new ContentItemModel({})
    currentQuestion: QuestionModel = new QuestionModel({})
    alive: boolean = true
    delivery: boolean = false
    options = Settings.toastOptions

    constructor(private router: Router, private route: ActivatedRoute, private service: ContentPackageService, 
        private auth: AuthService, public dialog: MdDialog, private notify: NotificationsService) {
        
    }

    ngOnInit() {
        this.route.params
        .takeWhile(() => this.alive)
        .subscribe((params: ParamMap) => {
            this.navigationId = params['id']
            this.loadPackageData(this.navigationId)
        })
    }

    ngOnDestroy() {
        this.alive = false
    }

    onQuestionSelected(question: QuestionModel) {
        this.currentQuestion = new QuestionModel(question)        
    }

    onQuestionSave(question: QuestionModel) {
        let found = this.currentContentItem.questions.find(q => q.id == question.id)
        
        if(found && found.id === question.id) {
            this.currentContentItem.questions.map(q => { 
            if(q.id == this.currentQuestion.id) {
                q.question = this.currentQuestion.question
                q.answers = this.currentQuestion.answers
                q.format = this.currentQuestion.format
            }
        })        
        } else {
            this.currentContentItem.questions.push(question)            
        }
        this.currentContentItem.questions.sort(QuestionModel.sortByQuestion)
        this.currentQuestion = question
        this.updatePackageItem()        
        
    }

    updatePackageItem() {
        this.currentPackage.content.forEach(item => {
            if(item.id === this.currentContentItem.id) {
                item.content = this.currentContentItem.content
                item.image = this.currentContentItem.image
                item.imageUrl = this.currentContentItem.imageUrl
                item.name = this.currentContentItem.name
                item.questions = this.currentContentItem.questions
            }
        })
    }

    toggleAssessment(item: ContentItemModel) {
        if(this.currentContentItem.id != item.id){
            this.currentContentItem = new ContentItemModel(item)    
            this.currentQuestion = new QuestionModel({})
            this.itemAssessment = true
        } else if(this.itemAssessment) {
            this.currentContentItem = new ContentItemModel({})
            this.itemAssessment = false
        } else {
            this.itemAssessment = !this.itemAssessment
        }
        this.itemEditing = false
        this.itemCreating = false        
    }

    loadPackageData(packageId: number) {
        if(packageId != null) {
            this.loading = true
            this.service.get(packageId)
            .takeWhile(() => this.alive)
            .catch( (errMsg) => {
                this.notify.error('Error', errMsg)     
                return Observable.of(null)
            })
            .subscribe(res => {
                this.currentPackage = res
                this.loading = false
            })
        }
    }

    toggleItemCreation() {        
        this.disableItemAssessment()
        this.currentContentItem = new ContentItemModel({})
        this.itemEditing = false
        this.itemCreating = !this.itemCreating
    }

    toggleItemEditing(item: ContentItemModel) {
        if(this.currentContentItem.id != item.id){
            this.currentContentItem = new ContentItemModel(item)
            this.itemEditing = true
        } else if (!this.itemEditing) {
            this.itemEditing = true
        } else {
            this.currentContentItem = new ContentItemModel({})
            this.itemEditing = false
        }
        
        this.disableItemAssessment()
        this.itemCreating = false
    }

    disableItemAssessment() {
        this.itemAssessment = false
        this.currentQuestion = new QuestionModel({})
    }

    onValueChange(data: ContentItemModel) {
        this.currentContentItem = data
    }

    saveItem() {
        if(this.currentContentItem && this.currentContentItem.name != '') {
            this.currentContentItem.packageId = this.currentPackage.id
            this.loading = true

            let data = new FormData()
            if(this.currentContentItem.id) data.append('id', this.currentContentItem.id.toString())
            if(this.currentContentItem.name) data.append('name', this.currentContentItem.name)
            if(this.currentContentItem.content) data.append('content', this.currentContentItem.content)
            if(this.currentContentItem.packageId) data.append('packageId', this.currentContentItem.packageId.toString())
            if(this.currentContentItem.imageUrl) data.append('imageUrl', this.currentContentItem.imageUrl)
            if(this.currentContentItem.image) data.append('image', this.currentContentItem.image)
            
            this.service.saveItem(data)
            .takeWhile(() => this.alive)
            .catch( (errMsg) => {
                this.notify.error('Error', errMsg)     
                return Observable.of(null)
            })
            .subscribe(res => {
                this.loading = false

                if(this.currentContentItem.id != null && this.currentContentItem.id > 0) {
                    this.postUpdateUiUpdate(res)
                } else {
                    this.postSaveUiUpdate(res)
                }
                this.clearContentItemUi()
                
            })
        }
    }

    navigateBack() {
        this.router.navigate(['content/'+this.currentPackage.folderId])
    }

    clearContentItemUi(){
        this.itemCreating = false
        this.itemEditing = false    
        this.itemAssessment = false
        this.currentContentItem = new ContentItemModel({})
    }

    postSaveUiUpdate(newItem: ContentItemModel) {
        this.currentPackage.content.push(newItem)
        this.currentPackage.content.sort(ContentItemModel.sortByName)
    }

    postUpdateUiUpdate(updatedItem: ContentItemModel) {
        this.currentPackage.content.map(e => { 
            if(e.id == updatedItem.id) {
                e.name = updatedItem.name
                e.content = updatedItem.content
                e.imageUrl = updatedItem.imageUrl
                e.questions = updatedItem.questions
            }
        })
        this.currentPackage.content.sort(ContentItemModel.sortByName)
    }

    confirmItemDelete(item: ContentItemModel) {
        let dialogRef = this.dialog.open(UnlinkConfirmDialog)
        dialogRef.componentInstance.item = item.name
        dialogRef.componentInstance.container = this.currentPackage.name
        dialogRef.componentInstance.action = 'delete'
        dialogRef.afterClosed().subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.deleteItem(item.id)
                    .takeWhile(() => this.alive)
                    .catch( (errMsg) => {
                        this.notify.error('Error', errMsg)     
                        return Observable.of(0)
                    })
                    .subscribe(response => {
                        if(response > 0) {
                            this.currentPackage.content = this.currentPackage.content.filter(element => element.id != item.id)
                            this.clearContentItemUi()
                        }
                    })
                }
            })
    }
}