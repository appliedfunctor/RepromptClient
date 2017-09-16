

import { MdDialog, MdInputModule, MdIconModule, MdAutocompleteModule, MdProgressSpinnerModule } from "@angular/material";
import { AuthService } from "app/_services/auth.service";
import { NotificationsService } from "angular2-notifications";
import { TestHelper } from "app/_test.libs/test-helper";
import { async } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { FileNavigationComponent } from "app/file/file-navigation.component";
import { ComponentFixture } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CohortService } from "app/_services/cohort.service";
import { UserModel } from "app/_models/user.model";
import { CohortModel } from "app/_models/cohort.model";
import { Observable } from "rxjs/Rx";

describe('FileNavigationComponent', () => {

    let mockDialog: MdDialog
    let mockAuthService: AuthService
    let mockNotify: NotificationsService
    let fixture: ComponentFixture<FileNavigationComponent>
    let component: FileNavigationComponent
    let mockCohortService: CohortService

    beforeEach(async(() => {
        mockCohortService = TestHelper.mock(CohortService, 'CohortService')
        mockCohortService.getAllItems = jasmine.createSpy('getAllItems').and.returnValue(Observable.of([new UserModel({id:1}), new UserModel({id:5})]))
        mockCohortService.getAllContainers = jasmine.createSpy('getAllContainers').and.returnValue(Observable.of([new CohortModel({id:1}), new CohortModel({id:5})]))
        mockCohortService.attach = jasmine.createSpy('attach').and.returnValue(Observable.of(1))
        mockCohortService.save = jasmine.createSpy('save').and.returnValue(Observable.of(new UserModel({id:111})))
        mockCohortService.delete = jasmine.createSpy('delete').and.returnValue(Observable.of(1))
        mockCohortService.detach = jasmine.createSpy('detach').and.returnValue(Observable.of(1))
        mockDialog = TestHelper.mock(MdDialog, 'MdDialog')
        mockDialog.open = jasmine.createSpy('open').and.returnValue({
            afterClosed: jasmine.createSpy('open').and.returnValue(Observable.of(true)),
            componentInstance: {item: "", container: "", action: ""}
        })
        mockAuthService = TestHelper.mock(AuthService, 'AuthService')
        mockAuthService.getCurrentUser = jasmine.createSpy('getCurrentUser').and.returnValue(Observable.of(new UserModel({id:26})))

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MdIconModule, MdInputModule, MdAutocompleteModule, MdProgressSpinnerModule],
            declarations: [FileNavigationComponent],
            providers: [   
                { provide: MdDialog, useValue: mockDialog },
                { provide: AuthService, useValue: mockAuthService },
                { provide: NotificationsService, useValue: mockNotify },
            ],
            //schemas: [ NO_ERRORS_SCHEMA ],
        }).compileComponents().then( () => {
            
            fixture = TestBed.createComponent(FileNavigationComponent)
            component = fixture.componentInstance
            component.service = mockCohortService
            component.title = "Title"
            component.elementType = UserModel
            component.containerType = CohortModel
            component.currentParent = new CohortModel({id:1}) 

        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialise', () => {
        fixture.detectChanges()
        expect(component).toBeTruthy()
    })

    it('should return true when checking terms with a match', () => {
        expect(component.checkTerms(["a"], ["a"])).toBeTruthy
    })

    it('should return false when checking terms without a match', () => {
        expect(component.checkTerms([], [])).toBeFalsy
    })

    it('should not attempt to match an item if supplied has invalid id', () => {
        component.attachItem(new UserModel({}))
        expect(mockCohortService.attach).toHaveBeenCalledTimes(0)
    })

    it('should attempt to match an item if supplied has valid id', () => {
        component.attachItem(new UserModel({id:8}))
        expect(mockCohortService.attach).toHaveBeenCalledTimes(1)
    })

    it('should not attempt to create an item if supplied has invalid data', () => {
        component.createNewItem(null)
        expect(mockCohortService.attach).toHaveBeenCalledTimes(0)
    })

    it('should attempt to create an item if supplied has valid data', () => {
        component.createNewItem("12 monkeys")
        expect(mockCohortService.attach).toHaveBeenCalledTimes(1)
    })

    it('should return all population when filtering without a term or current parent members', () => {
        expect(component.filterPopulationItems(null)).toBe(component.allItems)
    })

    it('should return all population less attached items when parent members exist, no supplied term', () => {
        let a = new UserModel({id:1})
        let b = new UserModel({id:2})
        let c = new UserModel({id:3})
        component.allItems = [a, b, c]
        component.currentParent = new CohortModel({id:5, members: [b]})
        expect(component.filterPopulationItems(null)).not.toContain(b)
    })

    it('should return only matching population when term supplied', () => {
        let a = new UserModel({id:1, firstName: "sammy"})
        let b = new UserModel({id:2, firstName: "same"})
        let c = new UserModel({id:3, firstName: "soon"})
        component.allItems = [a, b, c]
        component.currentParent = new CohortModel({id:5, members: [b]})
        expect(component.filterPopulationItems("am")).toContain(a)
        expect(component.filterPopulationItems("am")).not.toContain(b) //in currentparent
        expect(component.filterPopulationItems("am")).not.toContain(c)
    })

    it('should flip saving when toggleSave called', () => {
        component.editText = 'Badger'
        component.name = 'Sandy'
        component.saving = true
        component.updating = true
        component.toggleSave()
        expect(component.editText).toBe("Save")
        expect(component.name).toBe("")
        expect(component.saving).toBeFalsy()
        expect(component.updating).toBeFalsy()
    })

    it('should flip saving when toggleUpdate called', () => {
        component.editText = 'Badger'
        component.name = 'Sandy'
        component.saving = true
        component.updating = true
        component.breadcrumbs = [new CohortModel({id: 12, name: "love"})]
        component.toggleUpdate()
        expect(component.editText).toBe("Edit")
        expect(component.name).toBe("love")
        expect(component.saving).toBeFalsy()
        expect(component.updating).toBeFalsy()
    })

    it('should falsify and zero when toggleOff called', () => {
        component.populating = true
        component.name = 'Sandy'
        component.saving = true
        component.updating = true
        component.toggleOff()
        expect(component.populating).toBeFalsy()
        expect(component.name).toBe("")
        expect(component.saving).toBeFalsy()
        expect(component.updating).toBeFalsy()
    })

    it('should update when set to update and valid parenjt container', () => {
        let cohort = new CohortModel({id: 12, name: "love"})
        component.updating = true
        component.currentParent = cohort
        component.breadcrumbs = [cohort]
        component.allContainers = [cohort]
        component.submitData()
        expect(mockCohortService.save).toHaveBeenCalledTimes(1)
        expect(mockCohortService.save).toHaveBeenCalledWith(cohort)
    })

    it('should create new when not set to update or invalid parent container', () => {
        let cohort = new CohortModel({id: 12, name: "love"})
        component.updating = false
        component.currentParent = cohort
        component.breadcrumbs = [cohort]
        component.allContainers = [cohort]
        component.submitData()
        expect(mockCohortService.save).toHaveBeenCalledTimes(1)
        expect(mockCohortService.save).not.toHaveBeenCalledWith(cohort)
    })
    
    it('should reset navigation data when resetNavigation called', () => {
        let parent = new CohortModel({id: 45, name: "love"})
        let cohort = new CohortModel({id: 12, name: "love", parentId: 45})
        let a =  new CohortModel({id: 99, name: "bean"})
        let b =  new CohortModel({id: 99, name: "cheddar"})
        component.allContainers = [cohort, parent, a, b]
        component.breadcrumbs = [parent, cohort]
        component.currentParent = parent
        component.resetNavigation()
        
        expect(component.breadcrumbs.length).toBe(0)
        expect(component.currentParent).toBe(null)
        expect(component.path).toBe('/')
        expect(component.filteredContainers).toContain(a)
        expect(component.filteredContainers).toContain(b)
        expect(component.filteredContainers).toContain(parent)
    })

    it('should navigate back one level when navigateBack called', () => {
        let parent = new CohortModel({id: 45, name: "love"})
        let cohort = new CohortModel({id: 12, name: "love", parentId: 45})
        let a =  new CohortModel({id: 95, name: "bean"})
        let b =  new CohortModel({id: 99, name: "cheddar"})
        component.allContainers = [cohort, parent, a, b]
        component.currentParent = null
        component.breadcrumbs = []
        component.breadcrumbs.push(cohort)
        component.breadcrumbs.push(parent)
        component.breadcrumbs.push(a)
        component.navigateBack()
        expect(component.breadcrumbs.length).toBe(2)
        expect(component.breadcrumbs[0]).toBe(cohort)
        expect(component.breadcrumbs[1]).toBe(parent)
        expect(component.currentParent).toBe(parent)
    })

    it('should navigate to the supplied container', () => {
        let parent = new CohortModel({id: 45, name: "love"})
        let cohort = new CohortModel({id: 12, name: "love", parentId: 45})
        let a =  new CohortModel({id: 95, name: "bean"})
        let b =  new CohortModel({id: 99, name: "cheddar"})

        component.breadcrumbs = []
        component.breadcrumbs.push(cohort)
        component.breadcrumbs.push(parent)

        component.navigate(a)

        expect(component.breadcrumbs.length).toBe(3)
        expect(component.breadcrumbs[0]).toBe(cohort)
        expect(component.breadcrumbs[1]).toBe(parent)
        expect(component.breadcrumbs[2]).toBe(a)
        expect(component.currentParent).toBe(a)
    })

    it('should emit an item on selection', async(() => {
        let user = new UserModel({id: 634})
        component.elementSelection.subscribe( value => {
            expect(value).toBe(user)
        })
        component.itemSelected(user)
    }))

    it('should open a dialog to confirm delete', async(() => {
        component.confirmDelete(6)
        expect(mockDialog.open).toHaveBeenCalledTimes(1)
        expect(mockCohortService.delete).toHaveBeenCalledTimes(1)
    }))

    it('should open a dialog to confirm item unlink', async(() => {
        let cont = new CohortModel({id: 55})
        let user = new UserModel({id: 66})
        component.confirmItemUnlink(cont, user)
        expect(mockDialog.open).toHaveBeenCalledTimes(1)
        expect(mockCohortService.detach).toHaveBeenCalledTimes(1)
        expect(mockCohortService.detach).toHaveBeenCalledWith(55,66)
    }))

    it('should return an item name from displayAutocomplete if item isnt null', async(() => {
        let user = new UserModel({id: 66, firstName:"retname", surName:"Blah"})        
        expect(component.displayAutocomplete(user)).toBe(user.name)
    }))

    it('should return null from displayAutocomplete if item is null', async(() => {    
        expect(component.displayAutocomplete(null)).toBe(null)
    }))

    it('should navigate to the selected container on navigationId change', async(() => {  
        let parent = new CohortModel({id: 45, name: "love"})
        let cohort = new CohortModel({id: 12, name: "love", parentId: 45})
        let a =  new CohortModel({id: 95, name: "bean"})
        let b =  new CohortModel({id: 99, name: "cheddar"})
        component.allContainers = [cohort, parent, a, b]
        component.navigationId = 95
        component.ngOnChanges({navigationId: null})
        expect(component.currentParent).toBe(a)
    }))
    
})
    