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
    itemEditing = false
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

    toggleItemCreation() {        
        this.currentContentItem = new ContentItemModel({})
        this.itemEditing = false
        this.itemCreating = !this.itemCreating
    }

    toggleItemEditing(item: ContentItemModel) {
        if(this.currentContentItem.id != item.id){
            this.currentContentItem = new ContentItemModel(item)
            this.itemCreating = false
            this.itemEditing = true
        } else {
            this.currentContentItem = new ContentItemModel({})
            this.itemCreating = false
            this.itemEditing = false
        }
        
        
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

                if(this.currentContentItem.id != null && this.currentContentItem.id > 0) {
                    this.postUpdateUiUpdate(res)
                } else {
                    this.postSaveUiUpdate(res)
                }
                
                this.itemCreating = false
                this.itemEditing = false
                this.currentContentItem = new ContentItemModel({})
            })
        }
    }

    postSaveUiUpdate(newItem: ContentItemModel) {
        this.currentPackage.content.push(newItem)
        this.currentPackage.content.sort(this.sortItemsByName)
    }

    postUpdateUiUpdate(updatedItem: ContentItemModel) {
        this.currentPackage.content.map(e => { 
            if(e.id == updatedItem.id) {
                e.name = updatedItem.name
                e.content = updatedItem.content
                e.imageUrl = updatedItem.imageUrl
                e.questions = updatedItem.questions
            }
        })
        this.currentPackage.content.sort(this.sortItemsByName)
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