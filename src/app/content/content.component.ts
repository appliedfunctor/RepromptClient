import { Component } from "@angular/core"
import { ContentService } from "app/_services/content.service";

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    providers: [ContentService]
})
export class ContentComponent {
    title = "Content Management"

    constructor(private service: ContentService) {

    }

    ngOnInit() {

    }
    
}