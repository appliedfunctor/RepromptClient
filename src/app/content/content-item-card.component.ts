import { Component, Input } from "@angular/core"
import { ContentItemModel } from "app/_models/content-item.model";

@Component({
    selector: 'content-item-card',
    templateUrl: 'content-item-card.component.html'
})
export class ContentItemCardComponent {
    @Input() contentItem: ContentItemModel = new ContentItemModel({})
    @Input() active: boolean = false
}





