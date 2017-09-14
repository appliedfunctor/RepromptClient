import { CohortService } from "app/_services/cohort.service"
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

describe('CohortsComponent', () => {
    
    let fixture: ComponentFixture<CohortsComponent>
    let mockService: CohortService
    let mockAuthHttp: AuthHttp
    let component: CohortsComponent
    

    beforeEach(async(() => {         
        mockService = TestHelper.mock(CohortService, 'CohortService')
        mockAuthHttp = TestHelper.mock(AuthHttp, 'AuthHttp')

        TestBed.configureTestingModule({
            declarations: [CohortsComponent],
            providers: [   
                { provide: CohortService, useValue: mockService },
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