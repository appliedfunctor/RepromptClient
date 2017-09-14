import { ComponentFixture } from "@angular/core/testing";
import { CohortsComponent } from "app/cohorts/cohorts.component";
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
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('ContentComponent', () => {
    
    let fixture: ComponentFixture<CohortsComponent>
    let mockService: ContentService
    let mockAuthHttp: AuthHttp
    let component: CohortsComponent
    let toasterMock:NotificationsService
    

    beforeEach(async(() => {         
        mockService = TestHelper.mock(ContentService, 'ContentService')
        mockService = TestHelper.mock(AuthHttp, 'AuthHttp')
        mockAuthHttp = TestHelper.mock(AuthHttp, 'AuthHttp')
        toasterMock = TestHelper.mock(NotificationsService, 'NotificationsService')
        toasterMock.error = jasmine.createSpy('saveQuestion').and.returnValue('')

        TestBed.configureTestingModule({
            declarations: [CohortsComponent],
            providers: [   
                { provide: ContentService, useValue: mockService },
                { provide: Router, useValue: RouterTestingModule.withRoutes([]) },
                { provide: NotificationsService, useValue: toasterMock },
                { provide: AuthHttp, useValue: mockAuthHttp },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then( () => {
            
            fixture = TestBed.createComponent(CohortsComponent)
            component = fixture.componentInstance
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})