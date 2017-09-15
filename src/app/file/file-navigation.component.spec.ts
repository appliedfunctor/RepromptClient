

import { MdDialog, MdInputModule, MdIconModule, MdAutocompleteModule, MdProgressSpinnerModule } from "@angular/material";
import { AuthService } from "app/_services/auth.service";
import { NotificationsService } from "angular2-notifications";
import { TestHelper } from "app/_test.libs/test-helper";
import { async } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { FileNavigationComponent } from "app/file/file-navigation.component";
import { ComponentFixture } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('FileNavigationComponent', () => {

    let mockDialog: MdDialog
    let mockAuthService: AuthService
    let mockNotify: NotificationsService
    let fixture: ComponentFixture<FileNavigationComponent>
    let component: FileNavigationComponent

    beforeEach(async(() => {
        mockDialog = TestHelper.mock(MdDialog, 'MdDialog')
        mockAuthService = TestHelper.mock(AuthService, 'AuthService')

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
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialise', () => {
        fixture.detectChanges()
        expect(component).toBeTruthy()
    })

})
    