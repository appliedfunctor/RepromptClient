import { Component, ComponentFactoryResolver, ViewChild, Type, ViewContainerRef } from "@angular/core"
import { QuestionHandler } from "app/_models/question-handler.type";
import { QuestionEditSort } from "app/content/question-handlers/question-edit-sort.component";
import { QuestionEditMCSA } from "app/content/question-handlers/question-edit-mcsa.component";
import { QuestionEditService } from "app/_services/question-edit.service";
import { ContentItemModel } from "app/_models/content-item.model";

@Component({
    selector: 'content-item-question-edit',
    templateUrl: 'content-item-question-edit.component.html',
    providers: [QuestionEditService]
})
export class ContentItemQuestionEditComponent {
    questionTypes: any[]
    questionType: string  
    @ViewChild("host", {read: ViewContainerRef}) host: ViewContainerRef
    data = new ContentItemModel({id: 5})

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private service: QuestionEditService){}

    ngOnInit() {
        this.questionTypes = this.service.getQuestionHandlers()
        if(this.questionTypes.length > 0) {
            this.questionType = this.questionTypes[0].code
            this.loadComponent()
        }
    }

    loadComponent() {        
        let selected = this.questionTypes.find(qc => qc.code == this.questionType)
        let factory = this.componentFactoryResolver.resolveComponentFactory(selected.component)        
        this.host.clear()
        let componentRef = this.host.createComponent(factory);
        
        (<QuestionHandler>componentRef.instance).data = this.data
    }

    onSelectChange() {
        this.loadComponent()
    }
}