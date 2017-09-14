import { async, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MdInputModule } from '@angular/material';
import { FormBuilder, FormsModule } from "@angular/forms";
import { AuthService } from "app/_services/auth.service";
import { NotificationsService } from "angular2-notifications";
import { TestHelper } from "app/_test.libs/test-helper";
import { ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Observable } from "rxjs/Rx";

describe('LoginComponent', () => {

    let fixture: ComponentFixture<LoginComponent>
    let submitSpy = jasmine.createSpy('saveQuestion').and.returnValue(Observable.throw(new Error('error!')))
                                                                //Observable.of(''),
    let mockService: AuthService
    let toasterMock: NotificationsService
    let component: LoginComponent
    

    beforeEach(async(() => {         
        mockService = TestHelper.mock(AuthService, 'AuthService')
        mockService.login = submitSpy
        toasterMock = TestHelper.mock(NotificationsService, 'NotificationsService')
        toasterMock.error = jasmine.createSpy('saveQuestion').and.returnValue('')

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginComponent],
            providers: [   
                FormBuilder,
                { provide: AuthService, useValue: mockService },
                { provide: NotificationsService, useValue: toasterMock },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(LoginComponent)
            component = fixture.componentInstance
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should emit the supplied value on a loading event', async( () => {
        component.loadingEvent.subscribe( (value) => {
            expect(value).toBe(false)
        })         
        component.emitLoading(false)
    }))

    it('should submit correct data', async( () => {        
        component.email = "fake@email.com"
        component.password = "fakePass456"
        component.submit()
        expect(mockService.login).toHaveBeenCalledTimes(1)    
        expect(mockService.login).toHaveBeenCalledWith(component.email, component.password)  
    })) 

    it('should handle an error response', async( () => {        
        component.email = "fake@email.com"
        component.password = "fakePass456"
        component.submit() 
        expect(toasterMock.error).toHaveBeenCalledWith('Error', 'Error: error!')  
    })) 

    it('should switch tab', async( () => {        
        component.tab.subscribe( (value) => {
            expect(value).toBe(1)
        } )
        component.switchTab() 
    })) 
})