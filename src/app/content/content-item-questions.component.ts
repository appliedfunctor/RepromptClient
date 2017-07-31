import { Component, Input } from "@angular/core"
import { ContentItemModel } from "app/_models/content-item.model";
import { ContentPackageService } from "app/_services/content-package.service";

@Component({
    selector: 'content-item-questions',
    templateUrl: 'content-item-questions.component.html'
})
export class ContentItemQuestionsComponent {
    @Input() currentData: ContentItemModel = new ContentItemModel({})

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
}