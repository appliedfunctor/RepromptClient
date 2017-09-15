import { ComponentFixture } from "@angular/core/testing";
import { ContentComponent } from "app/content/content.component";
import { async } from "@angular/core/testing";
import { TestHelper } from "app/_test.libs/test-helper";
import { TestBed } from "@angular/core/testing";
import { FileNavigationComponent } from "app/file/file-navigation.component";
import { MdIconModule, MdInputModule, MdAutocompleteModule } from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ContentService } from "app/_services/content.service";
import { NotificationsService } from "angular2-notifications";
import { Router, ActivatedRoute, Routes, Params } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { fakeAsync } from "@angular/core/testing";
import {Location} from "@angular/common";
import { Observable } from "rxjs/Rx";
import { FileElement } from "app/_models/file-element.model";
import { ContentPackageModel } from "app/_models/content-package.model";

describe('ContentComponent', () => {
    
    let fixture: ComponentFixture<ContentComponent>
    let mockService: ContentService
    let mockAuthHttp: AuthHttp
    let mockActivatedRoute: ActivatedRoute
    let component: ContentComponent
    let toasterMock:NotificationsService
    let router: Router
    let location: Location
    let mockRouter

    const routes: Routes = [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'content', component: ContentComponent},
    ]
    

    beforeEach(async(() => {         
        mockService = TestHelper.mock(ContentService, 'ContentService')
        mockActivatedRoute = TestHelper.mock(ActivatedRoute, 'ActivatedRoute')
        mockActivatedRoute.params = Observable.of({id: "5"})
        toasterMock = TestHelper.mock(NotificationsService, 'NotificationsService')
        mockAuthHttp = TestHelper.mock(AuthHttp, 'AuthHttp')
        toasterMock.error = jasmine.createSpy('toast').and.returnValue('')
        mockRouter = RouterTestingModule.withRoutes(routes)
        mockRouter.navigate = jasmine.createSpy('navigate')

        TestBed.configureTestingModule({
            declarations: [ContentComponent],
            imports: [mockRouter],
            providers: [   
                { provide: ContentService, useValue: mockService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: AuthHttp, useValue: mockAuthHttp },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then( () => {
            router = TestBed.get(Router)
            location = TestBed.get(Location)
            fixture = TestBed.createComponent(ContentComponent)
            component = fixture.componentInstance
            router.initialNavigation
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should subscribe to route params on creation', fakeAsync(() => {        
        component.ngOnInit()
        expect(component.navigationId).toBe('5')
    }))

    it('should naviagte to a selected element', fakeAsync(() => {        
        component.elementSelected(new ContentPackageModel({id: '6'}))
        expect(router.navigate).toHaveBeenCalledWith(['content/package/6'])
    }))

    
})