import { AuthService } from "app/_services/auth.service";
import { PackageComponent } from "app/content/package.component";
import { ComponentFixture } from "@angular/core/testing";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { async } from "@angular/core/testing";
import { TestHelper } from "app/_test.libs/test-helper";
import { Observable } from "rxjs/Rx";
import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { fakeAsync } from "@angular/core/testing";
import { MdDialog } from "@angular/material";
import { ContentPackageService } from "app/_services/content-package.service";
import { Location } from "@angular/common";
import { QuestionModel } from "app/_models/question.model";
import { ContentItemModel } from "app/_models/content-item.model";
import { ContentPackageModel } from "app/_models/content-package.model";

describe('PackageComponent', () => {
    
    let fixture: ComponentFixture<PackageComponent>
    let mockService: ContentPackageService
    let mockAuthHttp: AuthHttp
    let mockActivatedRoute: ActivatedRoute
    let component: PackageComponent
    let toasterMock: NotificationsService
    let mockDialog: MdDialog
    let router: Router
    let location: Location
    let mockRouter
    let mockAuthService: AuthService

    const routes: Routes = [
        {path: '', redirectTo: 'package', pathMatch: 'full'},
        {path: 'package', component: PackageComponent},
    ]
    

    beforeEach(async(() => {         
        mockService = TestHelper.mock(ContentPackageService, 'ContentPackageService')
        mockService.get = jasmine.createSpy('get').and.returnValue(Observable.of('Sux'))
        mockService.saveItem = jasmine.createSpy('get').and.returnValue(Observable.of('Saved'))
        mockService.deleteItem = jasmine.createSpy('get').and.returnValue(Observable.of('Deleted'))
        mockActivatedRoute = TestHelper.mock(ActivatedRoute, 'ActivatedRoute')
        mockActivatedRoute.params = Observable.of({id: "5"}, {id: "5"})
        toasterMock = TestHelper.mock(NotificationsService, 'NotificationsService')
        mockAuthHttp = TestHelper.mock(AuthHttp, 'AuthHttp')
        toasterMock.error = jasmine.createSpy('toast').and.returnValue('')
        mockRouter = RouterTestingModule.withRoutes(routes)
        mockRouter.navigate = jasmine.createSpy('navigate')
        mockDialog = TestHelper.mock(MdDialog, 'MdDialog')
        mockDialog.open = jasmine.createSpy('open').and.returnValue({
            componentInstance: {item: "", container: "", action: ""},
            afterClosed: jasmine.createSpy('afterClosed').and.returnValue(Observable.of(true))
        })


        TestBed.configureTestingModule({
            declarations: [PackageComponent],
            imports: [mockRouter],
            providers: [                           
                { provide: ContentPackageService, useValue: mockService },
                //{ provide: Router, useValue: mockRouter },
                //{ provide: ActivatedRoute, useValue: mockActivatedRoute },  
                { provide: NotificationsService, useValue: toasterMock },   
                { provide: MdDialog, useValue: mockDialog },
                { provide: AuthService, useValue: mockAuthService },   
                { provide: AuthHttp, useValue: mockAuthHttp },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(PackageComponent)
            component = fixture.componentInstance

            router = TestBed.get(Router)
            location = TestBed.get(Location)            
            router.initialNavigation            
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should init correctly', () => {
        component.ngOnInit()
        expect(component).toBeTruthy()
    })

    it('should set alive to false on destroy', fakeAsync(() => {   
        expect(component.alive).toBe(true)     
        component.ngOnDestroy()
        expect(component.alive).toBe(false)
    }))

    it('should set the current question to a copy of the supplied question when selected', fakeAsync(() => {   
        let question = new QuestionModel({id: 9, question: "qx", format: "Sort", itemId: 12})
        expect(component.currentQuestion).not.toBe(question)
        component.onQuestionSelected(question)
        expect(component.currentQuestion).not.toBe(question)
        expect(component.currentQuestion.id).toBe(question.id)
        expect(component.currentQuestion.question).toBe(question.question)
        expect(component.currentQuestion.format).toBe(question.format)
        expect(component.currentQuestion.itemId).toBe(question.itemId)
    }))

    it('should add an unknown saved question to the list off questions', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({})
        let question = new QuestionModel({id: 9, question: "qx", format: "Sort", itemId: 12})
        expect(component.currentContentItem.questions).not.toContain(question)
        component.currentContentItem.questions = [question]
        let modifiedQuestion = new QuestionModel({id: 9, question: "qxx", format: "Sort", itemId: 12})
        
        component.onQuestionSave(modifiedQuestion)
        expect(component.currentContentItem.questions).toContain(question)
        expect(component.currentContentItem.questions.find(q => q.id == question.id).question).toBe("qxx")
    }))

    it('should add a known saved question to the list off questions', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({})
        let question = new QuestionModel({id: 9, question: "qx", format: "Sort", itemId: 12})
        expect(component.currentContentItem.questions).not.toContain(question)
        component.currentContentItem.questions = [question]
        let newQuestion = new QuestionModel({id: 11, question: "qxx", format: "Sort", itemId: 12})
        
        component.onQuestionSave(newQuestion)
        expect(component.currentContentItem.questions).toContain(question)
        expect(component.currentContentItem.questions).toContain(newQuestion)
        expect(component.currentContentItem.questions.find(q => q.id == question.id).question).toBe("qx")
        expect(component.currentContentItem.questions.find(q => q.id == newQuestion.id).question).toBe("qxx")
    }))

    it('should update the package Item from the currentContentItem', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: 3, content: "c", image: "i", imageUrl: "u", name: "name"})
        
        expect(component.currentPackage.content.find(e => e.id === 3).content).not.toBe(component.currentContentItem.content)

        component.updatePackageItem()
        
        expect(component.currentPackage.content.find(e => e.id === 3).content).toBe(component.currentContentItem.content)
        expect(component.currentPackage.content.find(e => e.id === 3).image).toBe(component.currentContentItem.image)
        expect(component.currentPackage.content.find(e => e.id === 3).imageUrl).toBe(component.currentContentItem.imageUrl)
        expect(component.currentPackage.content.find(e => e.id === 3).name).toBe(component.currentContentItem.name)
    }))

    it('should update the package Item from postUpdateUiUpdate', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: 3, content: "c", image: "i", imageUrl: "u", name: "name"})
        let newItem = new ContentItemModel({id: 3, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        
        component.postUpdateUiUpdate(newItem)
        
        expect(component.currentPackage.content.find(e => e.id === 3).content).toBe(newItem.content)
        expect(component.currentPackage.content.find(e => e.id === 3).questions).toBe(newItem.questions)
        expect(component.currentPackage.content.find(e => e.id === 3).imageUrl).toBe(newItem.imageUrl)
        expect(component.currentPackage.content.find(e => e.id === 3).name).toBe(newItem.name)
    }))
    
    it('should update the assessment item from toggleAssessment if item is different', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: 3, content: "c", image: "i", imageUrl: "u", name: "name"})
        
        expect(component.currentContentItem.id).toBe(3)
        let newItem = new ContentItemModel({id: 4, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        
        component.toggleAssessment(newItem)
        expect(component.currentContentItem.id).toBe(newItem.id)
        expect(component.currentQuestion.id).toBe(null)
        expect(component.itemAssessment).toBe(true)
    }))

    it('should update the assessment item from toggleAssessment if item is the same and assesmewnt false', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: 3, content: "c", image: "i", imageUrl: "u", name: "name"})
        component.currentQuestion = new QuestionModel({id: 52})
        component.itemAssessment = false

        expect(component.currentContentItem.id).toBe(3)
        let newItem = new ContentItemModel({id: 3, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        
        component.toggleAssessment(newItem)
        expect(component.currentContentItem.id).toBe(newItem.id)
        expect(component.currentQuestion.id).toBe(52)
        expect(component.itemAssessment).toBe(true)
    }))

    it('should update the assessment item from toggleAssessment if item is the same and assesment false', fakeAsync(() => {   
        component.currentPackage = new ContentPackageModel({content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: 3, content: "c", image: "i", imageUrl: "u", name: "name"})
        component.currentQuestion = new QuestionModel({id: 52})
        component.itemAssessment = true

        expect(component.currentContentItem.id).toBe(3)
        let newItem = new ContentItemModel({id: 3, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        
        component.toggleAssessment(newItem)
        expect(component.currentContentItem.id).toBe(null)
        expect(component.currentQuestion.id).toBe(52)
        expect(component.itemAssessment).toBe(false)
    }))
    
    it('should make the service call to loadPackageData', fakeAsync(() => {                
        component.loadPackageData(65)
        expect(mockService.get).toHaveBeenCalled()
    }))

    it('should toggleItemCreation from false to true correctly', () => {
        component.itemCreating = false
        component.itemAssessment = true
        component.itemEditing = true
        component.toggleItemCreation()
        expect(component.itemCreating).toBeTruthy()
        expect(component.itemAssessment).toBeFalsy()
        expect(component.itemEditing).toBeFalsy()
    })

    it('should toggleItemCreation from true to false correctly', () => {
        component.itemCreating = true
        component.itemAssessment = false
        component.itemEditing = false
        component.toggleItemCreation()
        expect(component.itemCreating).toBeFalsy()
        expect(component.itemAssessment).toBeFalsy()
        expect(component.itemEditing).toBeFalsy()
    })

    it('should toggleItemEditing to a new supplied item', () => {
        component.currentContentItem = new ContentItemModel({id: 4, content: "c", image: "i", imageUrl: "u", name: "name"})
        let item = new ContentItemModel({id: 3, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        
        component.itemEditing = false
        component.toggleItemEditing(item)
        expect(component.currentContentItem.id).toBe(item.id)
        expect(component.itemEditing).toBeTruthy()
    })

    it('should toggleItemEditing to the selected item when not editing', () => {
        component.currentContentItem = new ContentItemModel({id: 4, content: "c", image: "i", imageUrl: "u", name: "name"})
        component.itemEditing = false
        component.toggleItemEditing(component.currentContentItem)
        expect(component.itemEditing).toBeTruthy()
    })

    it('should toggleItemEditing to the selected item when editing', () => {
        component.currentContentItem = new ContentItemModel({id: 4, content: "c", image: "i", imageUrl: "u", name: "name"})
        component.itemEditing = true
        component.toggleItemEditing(component.currentContentItem)
        expect(component.itemEditing).toBeFalsy()
        expect(component.currentContentItem.id).toBe(null)
    })

    it('should change the current item on value change', () => {
        component.currentContentItem = new ContentItemModel({id: 4, content: "c", image: "i", imageUrl: "u", name: "name"})
        let item = new ContentItemModel({id: 3, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        component.onValueChange(item)
        expect(component.currentContentItem.id).toBe(item.id)
    })

    it('should change the current item on value change', () => {
        component.currentContentItem = new ContentItemModel({id: 4, content: "c", image: "i", imageUrl: "u", name: "name"})
        let item = new ContentItemModel({id: 3, content: "cx", image: "ix", imageUrl: "ux", name: "namex"})
        component.onValueChange(item)
        expect(component.currentContentItem.id).toBe(item.id)
    })

    it('should make a service call to save data', () => {
        component.currentPackage = new ContentPackageModel({id: 99, content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: null, content: "c", image: "i", imageUrl: "u", name: "name"})
        component.saveItem()
        expect(mockService.saveItem).toHaveBeenCalledTimes(1)
    })

    it('should open a dialog to confirm Item Delete', () => {
        component.currentPackage = new ContentPackageModel({id: 99, content: [new ContentItemModel({id: 3}), new ContentItemModel({id: 9})]})
        component.currentContentItem = new ContentItemModel({id: null, content: "c", image: "i", imageUrl: "u", name: "name"})
        
        component.confirmItemDelete(component.currentContentItem)
        expect(mockDialog.open).toHaveBeenCalledTimes(1)
        expect(mockService.deleteItem).toHaveBeenCalledTimes(1)
    })

    // it('should subscribe to route params on creation', fakeAsync(() => {        
    //     component.ngOnInit()
    //     expect(component.navigationId).toBe('5')
    // }))

    // it('should naviagte to a selected element', fakeAsync(() => {        
    //     //component.elementSelected(new ContentPackageModel({id: '6'}))
    //     expect(router.navigate).toHaveBeenCalledWith(['content/package/6'])
    // }))

    
})