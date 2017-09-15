import { Component, Input, Output, EventEmitter } from "@angular/core"
import { ContentItemModel } from "app/_models/content-item.model"
import { Paths } from "app/app.paths"

@Component({
    selector: 'content-item-card',
    templateUrl: 'content-item-card.component.html'
})
export class ContentItemCardComponent {
    @Input() contentItem: ContentItemModel = new ContentItemModel({})
    @Input() active: boolean = false
    @Input() delivery: boolean = true
    @Output() test = new EventEmitter<ContentItemModel>()
    base: string

    
    constructor(private path: Paths) {}

    ngOnChanges(changes) {
        if(changes.hasOwnProperty('contentItem')) {
            this.base = this.path.getBaseUrl(this.contentItem.imageUrl)
        }
    }

    notifyTest() {
        this.test.emit(this.contentItem)
    }
}





