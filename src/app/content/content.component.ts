import { Component } from "@angular/core"
import { ContentService } from "app/_services/content.service";
import { PackageModel } from "app/_models/package.model";
import { ContentFolderModel } from "app/_models/contentFolder.model";

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    providers: [ContentService]
})
export class ContentComponent {
    title = "Content Management"
    elementType = PackageModel
    containerType = ContentFolderModel
    itemIcon = "description"
    populateMode = 'create'
    itemName = 'Package'

    constructor(private service: ContentService) {

    }

    ngOnInit() {

    }
    
}