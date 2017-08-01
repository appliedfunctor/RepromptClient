import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FileUploadModule } from 'primeng/primeng'
import { ContentItemModel } from "app/_models/content-item.model";

interface Window {
    webkitURL?: any;
}

@Component({
    selector: 'content-item-edit',
    templateUrl: 'content-item-edit.component.html'
})
export class ContentItemEditComponent {

    @Input() element: string
    @Input() active: boolean
    @Input() packageId: number
    @Input() currentData: ContentItemModel = new ContentItemModel({})
    @Output() valueChange = new EventEmitter<ContentItemModel>()
    @Output() submit = new EventEmitter<boolean>()
    
    editText: string = 'Save'

    ngOnInit() {
        this.notifyChange()
    }

    onSubmit() {
        if(this.currentData.name && this.currentData.name != '') {
            this.submit.emit(true)
        }
    }

    fileUpload(object) {
        //console.log(object.files)
        if(object.files && object.files.length > 0) {
            this.currentData.image = object.files[0]
            //console.log(this.currentData.image)
            this.notifyChange()
        }
    }

    notifyChange() {
        this.valueChange.emit(this.currentData)
    }

}