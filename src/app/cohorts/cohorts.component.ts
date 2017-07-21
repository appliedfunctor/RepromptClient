import { Component, Output, EventEmitter } from "@angular/core";
import { CohortService } from "app/_services/cohort.service";
import { CohortModel } from "app/_models/cohort.model";
import { Observable } from "rxjs/Observable";
import { Pipe, PipeTransform } from '@angular/core';
import { MdDialog, MdDialogRef, MdAutocompleteModule } from '@angular/material';
import { AuthService } from "app/_services/auth.service";
import { UserModel } from "app/_models/user.model";
import { FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'cohorts',
    templateUrl: 'cohorts.component.html',
    providers: [CohortService]
})
export class CohortsComponent{
    @Output() tab = new EventEmitter<number>()
    usersControl: FormControl = new FormControl()
    populateUsersForm = new FormGroup({
       usersControl: this.usersControl
    });
    allUsers: UserModel[] = []
    filteredUsers: Observable<UserModel[]>  
    populating: boolean = false
    loading: boolean = true
    cohortData: CohortModel[]
    displayCohortData: CohortModel[]
    path: string = "/"
    currentParent: CohortModel = null
    breadcumbs: CohortModel[] = []
    saving: boolean = false;
    updating: boolean = false;
    editText: string = 'Save'
    error: Boolean = false
    errorMessage: string = "There has been an error attempting to authenticate you."
    name: string = ""

    /**
     * Creates an instance of CohortsComponent.
     * @param {CohortService} service 
     * @param {MdDialog} dialog 
     * @param {AuthService} auth 
     * @memberof CohortsComponent
     */
    constructor(private service: CohortService, public dialog: MdDialog, private auth: AuthService) {
        this.loadData()        
    }

    /**
     * 
     * filter the list of users down based on information already entered into the box
     * 
     * @param {string} restrictTerm 
     * @returns 
     * @memberof CohortsComponent
     */
    filterPopulationUsers(restrictTerm: string): UserModel[] {
        if(restrictTerm != null) {
            let terms = restrictTerm.split(" ")
            return this.allUsers.filter(s => this.checkTerms(terms, [s.firstName, s.surName, s.email]) 
                                                && !this.currentParent.members.includes(s) )  //exclude members already attached to parent          
        }
        return this.allUsers
    }

    /**
     * Perform the checking against terms and checks to find any match
     * return true if any match is found, false otherwise
     * 
     * @param {string[]} terms the search terms
     * @param {string[]} check the values to check against
     * @returns {boolean} 
     * @memberof CohortsComponent
     */
    checkTerms(terms: string[], check: string[]): boolean {
        return terms.map(t => check.map(c => c.toLowerCase().indexOf(t.toLowerCase()) >= 0)
                    .reduce( (a, b) => a || b, false))
                    .reduce( (c, d) => c || d, false )
    }

    attachUser(user: UserModel) {
        if(user.id != null && user.id > 0) {
            this.service.attach(this.currentParent.id, user.id).subscribe(res => {
                if(res > 0) {
                    this.togglePopulate()
                    this.currentParent.members.push(user)
                    this.currentParent.members.sort((a, b) => this.sortUsersByName(a, b))
                }
            })
        }
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
        console.log(data)
        this.service.save(data).subscribe(res => {
            if(res != null && res.hasOwnProperty('error')) {
                this.error = res.error
            } else {
                this.cohortData.map(e => { if(e.id == res.id) e.name = res.name })
                this.cohortData.sort((a, b) => this.sortCohortsByName(a, b))
                this.displayCohortData.map(e => { if(e.id == res.id) e.name = res.name })
                this.displayCohortData.sort((a, b) => this.sortCohortsByName(a, b))
                this.resetForm()
                this.updateNavigation()
                this.loading = false
            }
        })
    }

    createNewCohort() {
        let data = new CohortModel({parentId: this.currentParent ? this.currentParent.id : null, ownerId: this.auth.getCurrentUser().id,  name: this.name})
        console.log(data)
        this.service.save(data).subscribe(res => {
            if(res != null && res.hasOwnProperty('error')) {
                this.error = res.error
            } else {
                this.cohortData.push(res)
                this.cohortData.sort((a, b) => this.sortCohortsByName(a, b))
                this.displayCohortData.push(res)
                this.displayCohortData.sort((a, b) => this.sortCohortsByName(a, b))
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

    sortCohortsByName(a: CohortModel, b: CohortModel) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }

    sortUsersByName(a: UserModel, b: UserModel) {
        if(a.surName > b.surName) { return 1 }
        if(a.surName < b.surName) { return -1 }
        if(a.firstName > b.firstName) { return 1 }
        if(a.firstName < b.firstName) { return -1 }
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

    updateRootCohortData(parent: CohortModel) {
        if(parent != null){
            this.displayCohortData = this.cohortData.filter(e => e.parentId == parent.id)
        } else {
            this.displayCohortData = this.cohortData.filter(e => e.parentId == 0)
        }
    }

    switchTab(tab: number) {
        this.tab.emit(tab)
    }

    navigate(cohort: CohortModel) {
        if(cohort != null && cohort.hasOwnProperty('id')) {
            this.breadcumbs.push(cohort)      
            this.currentParent = cohort 
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

    togglePopulate() {
        this.populating = !this.populating
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
            })
        }
    }

    confirmUserUnlink(selectedCohort: CohortModel, selectedUser: UserModel) {
        let dialogRef = this.dialog.open(UnlinkConfirmDialog)
        dialogRef.componentInstance.user = selectedUser.firstName + " " + selectedUser.surName
        dialogRef.componentInstance.cohort = selectedCohort.name
        dialogRef.afterClosed().subscribe(res => {
                if(res === true) {
                    //perform deletion
                    this.service.detach(selectedCohort.id, selectedUser.id).subscribe(response => {
                        if(response > 0) {
                            selectedCohort.members = selectedCohort.members.filter(user => user.id != selectedUser.id)
                        }
                    })
                }
            })
    }

    displayUserAutocomplete(user: UserModel) {
        return user ? user.firstName + " " + user.surName : user
    }

    loadAllUsers() {
        this.service.getAllUsers().subscribe(res => {
            if (res.length > 0) {
                this.allUsers = res
            }
            this.loading = false
        })
    }

    ngOnInit() {
        this.filteredUsers = this.usersControl.valueChanges
                            .startWith(null)
                            .map(user => user && typeof user === 'object' ? user.firstName + " " + user.surName : user)
                            .map(name => name ? this.filterPopulationUsers(name) : this.allUsers.filter(s => !this.currentParent.members.includes(s)))
                            //todo make sure initial set excludes members already in cohort
        this.loading = true
        this.loadAllUsers()
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
    public user: string
    public cohort: string
}