import { Component } from "@angular/core"
import { StudyService } from "app/_services/study.service"
import { NotificationsService } from "angular2-notifications"
import { Observable } from "rxjs/Rx"
import { ContentItemModel } from "app/_models/content-item.model";

@Component({
    selector: 'manage',
    templateUrl: 'manage.component.html',
    providers: [StudyService]
})
export class ManageComponent {
    loading: boolean = false
    active: boolean = true
    items: ContentItemModel[] = []

    constructor(private service: StudyService, private notify: NotificationsService) {        
    }

    ngOnInit() {
        this.loading = true
        this.service.getContentItemsStatus()
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

    }

}