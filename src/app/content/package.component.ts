import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Component } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service"
import { ContentPackageModel } from "app/_models/content-package.model"
import { ContentItemEditComponent } from 'app/content/content-item-edit.component'
import { ContentItemModel } from "app/_models/content-item.model";

@Component({
    selector: 'content-package',
    templateUrl: 'package.component.html',
    providers: [ContentPackageService]
})
export class PackageComponent {

    navigationId = null
    currentPackage: ContentPackageModel = null
    loading = false
    itemCreating = false
    itemName = 'Content Item'
    currentContentItem: ContentItemModel = new ContentItemModel({})

    constructor(private route: ActivatedRoute, private service: ContentPackageService) {
        
    }

    ngOnInit() {
        this.route.params.subscribe((params: ParamMap) => {
            this.navigationId = params['id']
            this.loadPackageData(this.navigationId)
        })
    }

    loadPackageData(packageId: number) {
        this.loading = true
        this.service.get(packageId).subscribe(res => {
            this.currentPackage = res
            this.loading = false
        })
    }

    toggleItem() {
        this.itemCreating = !this.itemCreating
    }

    onValueChange(data: ContentItemModel) {
        this.currentContentItem = data
    }

    saveItem(data: ContentItemModel) {
        if(data && data.name != '') {
            console.log(JSON.stringify(data))
            // this.loading = true
            // this.service.saveItem(data).subscribe(res => {
            //     this.loading = false
            //     this.currentPackage.content.push(res)
            //     this.currentPackage.content.sort(this.sortItemsByName)
            // })
        }
    }

    sortItemsByName(a: ContentItemModel, b: ContentItemModel) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }
}