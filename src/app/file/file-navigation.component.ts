import { Component, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Pipe, PipeTransform, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdAutocompleteModule } from '@angular/material';
import { AuthService } from "app/_services/auth.service";
import { UserModel } from "app/_models/user.model";
import { FormControl, FormGroup } from '@angular/forms';
import { FileElement } from "app/_models/fileElement.type";
import { FileContainer } from "app/_models/fileContainer.type";
import { ContainerService } from "app/_services/container.service.type";

@Component({
    selector: 'file-navigation',
    templateUrl: 'file-navigation.component.html'
})
export class FileNavigationComponent {
    @Input() service: ContainerService
    @Input() title: string
    @Input() itemIcon: string = 'add_circle'
    @Input() elementType
    @Input() containerType
    @Input() populateMode: string = 'attach'
    @Input() itemName: string = 'Item'

    itemNameValue: string = ''

    itemsControl: FormControl = new FormControl()
    populateForm = new FormGroup({
       itemsControl: this.itemsControl
    });
    allItems: FileElement[] = []
    filteredItems: Observable<FileElement[]>

    populating: boolean = false
    loading: boolean = true

    allContainers: FileContainer[] = []
    filteredContainers: FileContainer[] = []
    path: string = "/"
    currentParent: FileContainer = null
    breadcumbs: FileContainer[] = []
    saving: boolean = false;
    updating: boolean = false;
    editText: string = 'Save'
    error: Boolean = false
    errorMessage: string = "There has been an error attempting to authenticate you."
    name: string = ""

    constructor(public dialog: MdDialog, private auth: AuthService) {

    }

    ngOnInit() {
        this.filteredItems = this.itemsControl.valueChanges
                            .startWith(null)
                            .map(item => item && typeof item === 'object' && item as FileElement ? item.name : item)
                            .map(name => name ? this.filterPopulationItems(name) : this.filterPopulationItems(null))
        this.loading = true
        this.loadData()  
        this.loadAllItems()
    }

    loadData() {
        this.service.getAllContainers().subscribe(res => {

            if(res && res.length > 0) {                
                this.allContainers = res
                console.log(this.allContainers)
                this.updateRootallContainers(null)
            }            

            this.loading = false
        })
    }

    loadAllItems() {
        this.service.getAllItems().subscribe(res => {
            if (res.length > 0) {
                this.allItems = res
            }
            this.loading = false
        })
    }

    /**
     * Perform the checking against terms and checks to find any match
     * return true if any match is found, false otherwise
     * 
     * @param {string[]} terms the search terms
     * @param {string[]} check the values to check against
     * @returns {boolean} 
     * @memberof ContainersComponent
     */
    checkTerms(terms: string[], check: string[]): boolean {
        return terms.map(t => check.map(c => c.toLowerCase().indexOf(t.toLowerCase()) >= 0)
                    .reduce( (a, b) => a || b, false))
                    .reduce( (c, d) => c || d, false )
    }

    attachItem(item: FileElement) {
        if(item.id != null && item.id > 0) {
            this.service.attach(this.currentParent.id, item.id).subscribe(res => {
                if(res > 0) {
                    this.togglePopulate()
                    this.itemsControl.reset()
                    this.currentParent.members.push(item)
                    this.currentParent.members.sort((a, b) => this.sortElementsByName(a, b))
                }
            })
        }
    }

    createElement<element extends FileElement>(element:{ new(...args: any[]): element }, data): element
    {
        return new element(data)
    }

    createContainer<container extends FileContainer>(container:{ new(...args: any[]): container }, data): container
    {
        return new container(data)
    }

    /**
     * 
     * filter the list of users down based on information already entered into the box
     * 
     * @param {string} restrictTerm 
     * @returns 
     * @memberof ContainersComponent
     */
    filterPopulationItems(restrictTerm: string): FileElement[] {
        if(restrictTerm != null) {
            let terms = restrictTerm.split(" ")
            return this.allItems.filter(item => {
                    let concreteItem = this.createElement(this.elementType, item)
                    this.checkTerms(terms, concreteItem.getSearchValues()) 
                    && this.currentParent.members.filter(m => m.id === item.id).length === 0
                }
            )         
        }
        return this.allItems.filter(user => this.currentParent.members.filter(m => m.id === user.id).length === 0)
    }

    

    toggleSave() {
        this.editText = 'Save'
        this.name = ''
        this.saving = !this.saving 
        if(this.updating) {
            this.updating = false
        }
    }

    toggleUpdate() {
        this.editText = 'Edit'
        this.name = this.getCurrentName()
        this.updating = !this.updating
        if(this.saving) {
            this.saving = false
        }
    }

    togglePopulate() {
        this.populating = !this.populating
    }

    toggleOff() {
        this.populating = false
        this.saving = false
        this.updating = false
        this.name = ''

    }

    submitData() {
        this.loading = true
        if(this.updating && this.currentParent != null) {
            this.updateContainer()
        } else {
            this.createNewContainer()
        }
    }

    updateContainer() {
        let data = this.getCurrentContainer()
        data.name = this.name
        this.service.save(data).subscribe(res => {
            if(res != null && res.hasOwnProperty('error')) {
                this.error = res.error
            } else {
                this.allContainers.map(e => { if(e.id == res.id) e.name = res.name })
                this.allContainers.sort((a, b) => this.sortContainersByName(a, b))
                this.filteredContainers.map(e => { if(e.id == res.id) e.name = res.name })
                this.filteredContainers.sort((a, b) => this.sortContainersByName(a, b))
                this.resetForm()
                this.updateNavigation()
                this.loading = false
            }
        })
    }

    createNewContainer() {
        let data = {parentId: this.currentParent ? this.currentParent.id : null, ownerId: this.auth.getCurrentUser().id,  name: this.name, members: []}
        console.log(data)
        this.service.save(data).subscribe(res => {
            if(res != null && res.hasOwnProperty('error')) {
                this.error = res.error
            } else {
                this.allContainers.push(res)
                this.allContainers.sort((a, b) => this.sortContainersByName(a, b))
                this.filteredContainers.push(res)
                this.filteredContainers.sort((a, b) => this.sortContainersByName(a, b))
                this.resetForm()
                this.loading = false
            }
        })
    }

    getCurrentContainer(): FileContainer {
        let current = this.breadcumbs.pop()
        this.breadcumbs.push(current)
        return current
    }

    getCurrentName(): string {
        let current = this.breadcumbs.pop()
        this.breadcumbs.push(current)
        return current.name
    }

    sortElementsByName(a: FileElement, b: FileElement) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }

    sortContainersByName(a: FileContainer, b: FileContainer) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }

    resetForm() {
        this.name = ""        
        this.saving = false
        this.updating = false
    }

    updateRootallContainers(parent: FileContainer) {
        if(parent != null){
            this.filteredContainers = this.allContainers.filter(e => e.parentId == parent.id)
        } else {
            this.filteredContainers = this.allContainers.filter(e => e.parentId == 0 || e.parentId == null)
        }
    }

    navigate(container: FileContainer) {
        if(container != null && container.hasOwnProperty('id')) {
            this.toggleOff()
            this.breadcumbs.push(container)      
            this.currentParent = container
            this.updateNavigation()
        }
    }

    updateNavigation() {        
        this.buildPath()
        this.updateRootallContainers(this.currentParent)
    }

    navigateBack() {

        this.toggleOff()

        this.breadcumbs.pop()
        if( this.breadcumbs.length < 1) {
            this.resetNavigation()          
        } else {
            let last = this.breadcumbs.pop()
            this.currentParent = last
            this.breadcumbs.push(last)
            this.updateNavigation()
        }
        
    }

    resetNavigation() {
        this.breadcumbs = []
        this.currentParent = null
        this.updateNavigation()
        this.buildPath()
    }

    buildPath() {
        let showDepth = 5
        this.path = '/'
        if(this.breadcumbs.length > showDepth) {
            this.path = '.../'
        }
        this.breadcumbs.slice(-showDepth).forEach(c => this.path += c.name + '/')
    }

    confirmDelete(selectedContainerId: number) {
        if(selectedContainerId != null) {
            let dialogRef = this.dialog.open(DeleteConfirmDialog)
            dialogRef.afterClosed().subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.delete(selectedContainerId).subscribe(response => {
                        if(response > 0) {
                            this.allContainers = this.allContainers.filter(e => e.id != selectedContainerId)
                            this.navigateBack()
                        }
                    })
                }
            })
        }
    }

    confirmItemUnlink(selectedContainer: FileContainer, selectedItem: FileElement) {
        let dialogRef = this.dialog.open(UnlinkConfirmDialog)
        dialogRef.componentInstance.item = selectedItem.name
        dialogRef.componentInstance.container = selectedContainer.name
        dialogRef.afterClosed().subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.detach(selectedContainer.id, selectedItem.id).subscribe(response => {
                        if(response > 0) {
                            selectedContainer.members = selectedContainer.members.filter(item => item.id != selectedItem.id)
                        }
                    })
                }
            })
    }

    displayAutocomplete(item: FileElement) {
        return item ? item.name : item
    }
}

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: 'delete-confirm.dialog.html',
})
export class DeleteConfirmDialog {}

@Component({
  selector: 'unlink-confirm-dialog',
  templateUrl: 'unlink-confirm.dialog.html',
})
export class UnlinkConfirmDialog {
    public item: string
    public container: string
}