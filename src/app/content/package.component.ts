import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Component } from "@angular/core"
import { ContentPackageService } from "app/_services/content-package.service"
import { ContentPackageModel } from "app/_models/content-package.model"
import { ContentItemEditComponent } from 'app/content/content-item-edit.component'
import { ContentItemModel } from "app/_models/content-item.model";
import { AuthService } from "app/_services/auth.service";
import { MdDialog, MdDialogRef, MdAutocompleteModule } from '@angular/material';
import { UnlinkConfirmDialog } from "app/dialogs/unlink-confirm.dialog";


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

    constructor(private route: ActivatedRoute, private service: ContentPackageService, private auth: AuthService, public dialog: MdDialog) {
        
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

    saveItem() {
        if(this.currentContentItem && this.currentContentItem.name != '') {
            this.currentContentItem.packageId = this.currentPackage.id
            console.log(JSON.stringify(this.currentContentItem))
            this.loading = true

            let data = new FormData()
            if(this.currentContentItem.id) data.append('id', this.currentContentItem.id.toString())
            if(this.currentContentItem.name) data.append('name', this.currentContentItem.name)
            if(this.currentContentItem.content) data.append('content', this.currentContentItem.content)
            if(this.currentContentItem.packageId) data.append('packageId', this.currentContentItem.packageId.toString())
            if(this.currentContentItem.image) data.append('image', this.currentContentItem.image)
            
            this.service.saveItem(data).subscribe(res => {
                this.loading = false
                this.currentPackage.content.push(res)
                this.currentPackage.content.sort(this.sortItemsByName)
                this.itemCreating = false
            })
        }
    }

    confirmItemDelete(item: ContentItemModel) {
        let dialogRef = this.dialog.open(UnlinkConfirmDialog)
        dialogRef.componentInstance.item = item.name
        dialogRef.componentInstance.container = this.currentPackage.name
        dialogRef.componentInstance.action = 'delete'
        dialogRef.afterClosed().subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.deleteItem(item.id).subscribe(response => {
                        if(response > 0) {
                            this.currentPackage.content = this.currentPackage.content.filter(element => element.id != item.id)
                        }
                    })
                }
            })
    }

    sortItemsByName(a: ContentItemModel, b: ContentItemModel) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }
}