import { Component, Output, EventEmitter } from "@angular/core";
import { CohortService } from "app/_services/cohort.service";
import { CohortModel } from "app/_models/cohort.model";
import { Observable } from "rxjs/Observable";
import { Pipe, PipeTransform } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AuthService } from "app/_services/auth.service";

@Component({
    selector: 'cohorts',
    templateUrl: 'cohorts.component.html',
    providers: [CohortService]
})
export class CohortsComponent{
    @Output() tab = new EventEmitter<number>()
    //cohorts: CohortModel[] = []
    loading: boolean = true
    cohortData: CohortModel[]
    displayCohortData: CohortModel[]
    path: string = "/"
    currentParent: number = null
    breadcumbs: CohortModel[] = []
    saving: boolean = false;
    updating: boolean = false;
    editText: string = 'Save'
    error: Boolean = false
    errorMessage: string = "There has been an error attempting to authenticate you."
    name: string = ""

    constructor(private service: CohortService, public dialog: MdDialog, private auth: AuthService) {
        this.loadData()
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

    submitData() {
        this.loading = true
        if(this.updating && this.currentParent != null) {
            this.updateCohort()
        } else {
            this.createNewCohort()
        }
    }

    updateCohort() {
        let data = this.getCurrentCohort()
        data.name = this.name
        this.service.save(data).subscribe(res => {
            if(res.hasOwnProperty('error')) {
                this.error = res.error
            } else {
                this.cohortData.map(e => { if(e.id == res.id) e.name = res.name })
                this.cohortData.sort((a, b) => this.sortByName(a, b))
                this.displayCohortData.map(e => { if(e.id == res.id) e.name = res.name })
                this.displayCohortData.sort((a, b) => this.sortByName(a, b))
                this.resetForm()
                this.updateNavigation()
                this.loading = false
            }
        })
    }

    createNewCohort() {
        let data = new CohortModel({parentId: this.currentParent, ownerId: this.auth.getCurrentUser().id,  name: this.name})
        this.service.save(data).subscribe(res => {
            if(res.hasOwnProperty('error')) {
                this.error = res.error
            } else {
                this.cohortData.push(res)
                this.cohortData.sort((a, b) => this.sortByName(a, b))
                this.displayCohortData.push(res)
                this.displayCohortData.sort((a, b) => this.sortByName(a, b))
                this.resetForm()
                this.loading = false
            }
        })
    }

    getCurrentCohort(): CohortModel {
        let current = this.breadcumbs.pop()
        this.breadcumbs.push(current)
        return current
    }

    getCurrentName(): string {
        let current = this.breadcumbs.pop()
        this.breadcumbs.push(current)
        return current.name
    }

    sortByName(a: CohortModel, b: CohortModel) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }

    resetForm() {
        this.name = ""        
        this.saving = false
        this.updating = false
    }

    loadData() {
        this.service.getAll().subscribe(res => {
            this.cohortData = res
            this.updateRootCohortData(null)
            this.loading = false
        })
    }

    updateRootCohortData(parentId: number) {
        this.displayCohortData = this.cohortData.filter(e => e.parentId == parentId)
    }

    switchTab(tab: number) {
        this.tab.emit(tab)
    }

    navigate(cohort: CohortModel) {
        if(cohort != null && cohort.hasOwnProperty('id')) {
            this.breadcumbs.push(cohort)      
            this.currentParent = cohort.id  
            this.updateNavigation()
        }
    }

    updateNavigation() {        
        this.buildPath()
        this.updateRootCohortData(this.currentParent)
    }

    navigateBack() {
        this.breadcumbs.pop()
        if( this.breadcumbs.length < 1) {
            this.resetNavigation()          
        } else {
            let last = this.breadcumbs.pop()
            this.currentParent = last.id
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
        this.path = '/'
        this.breadcumbs.forEach(c => this.path += c.name + '/')
    }

    confirmDelete(selectedCohortId: number) {
        if(selectedCohortId != null) {
            let dialogRef = this.dialog.open(DeleteConfirmDialog)
            dialogRef.afterClosed().subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.delete(selectedCohortId).subscribe(response => {
                        if(response > 0) {
                            this.cohortData = this.cohortData.filter(e => e.id != selectedCohortId)
                            this.navigateBack()
                        }
                    })
                }
            });
        }
    }
}

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.html',
})
export class DeleteConfirmDialog {}