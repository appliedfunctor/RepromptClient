import { Component } from "@angular/core"
import { StudyService } from "app/_services/study.service"
import { NotificationsService } from "angular2-notifications"
import { Observable } from "rxjs/Rx"
import { ExamModel } from "app/_models/exam.model"

@Component({
    selector: 'manage',
    templateUrl: 'manage.component.html',
    providers: [StudyService]
})
export class ManageComponent {
    loading: boolean = false
    active: boolean = true
    items: ExamModel[] = []

    constructor(private service: StudyService, private notify: NotificationsService) {        
    }

    ngOnInit() {
        this.loading = true
        this.service.getContentAssignedStatus()
        .takeWhile( () => this.active )
        .catch( err => {
            this.notify.error("Error", err)
            return Observable.of(null)
        }).subscribe( res => {
            if(res) {
                this.items = res
            }            
            this.loading = false
        })
        
    }

    ngOnDestroy() {
        this.active = false
    }

    toggleExamStatus(assignedExam: ExamModel) {
        if(assignedExam.enabled) {
            this.enableExam(assignedExam.id)
        }
    }

    enableExam(id: number) {
        this.loading = true
        this.service.enableContent(id)
        .takeWhile( () => this.active)
        .catch(err => {
            this.notify.error("error", err)
            return Observable.of(null)
        })
        .subscribe(res => {
            if(res) {
                this.updateItemEnabledStatus(id, true)
            }
            this.loading = false
        }) 
    }

    disableExam(id: number) {
        this.loading = true
        this.service.disableContent(id)
        .takeWhile( () => this.active)
        .catch(err => {
            this.notify.error("error", err)
            return Observable.of(null)
        })
        .subscribe(res => {
            if(res) {
                this.updateItemEnabledStatus(id, false)
            }
            this.loading = false
        }) 
    }

    updateItemEnabledStatus(id: number, enabled: boolean) {
        let selected = this.items.find( exam => exam.id == id)
    }

}