import { Component } from "@angular/core"
import { StudyService } from "app/_services/study.service"
import { ContentItemModel } from "app/_models/content-item.model"
import { QuestionModel } from "app/_models/question.model"
import { Observable } from "rxjs/Rx"
import { NotificationsService } from "angular2-notifications"
import { Settings } from "app/libs/Settings";

@Component({
    selector: 'study',
    templateUrl: 'study.component.html',
    providers: [StudyService]
})
export class StudyComponent {
    loading: boolean = false
    active: boolean = true
    pendingContent: ContentItemModel[]
    currentContent: ContentItemModel = null
    pendingQuestions: QuestionModel[] = []
    currentQuestion: QuestionModel = null
    options = Settings.toastOptions

    constructor(private service: StudyService, private notify: NotificationsService) { }

    ngOnInit() {
        this.loading = true
        this.service.getContentItems()
            .takeWhile(() => this.active)
            .catch( (errMsg) => {
                this.notify.error('Error', errMsg)     
                return Observable.of(null)
            })
            .subscribe( res => {
                if(res) {
                    this.pendingContent = res
                    if(this.pendingContent.length > 0) this.currentContent = this.pendingContent.pop()
                }
                this.loading = false
            })
    }

    test(item: ContentItemModel) {
        this.pendingQuestions = this.currentContent.questions
        this.pendingQuestions.sort()
        if(this.pendingQuestions.length > 0) {
            this.currentQuestion = this.pendingQuestions.pop()
        } else {
            this.currentQuestion = null
        }
    }

}