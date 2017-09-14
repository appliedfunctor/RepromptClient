import { async, TestBed } from '@angular/core/testing'
import { RegisterComponent } from './register.component'
import { MdInputModule } from '@angular/material'
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { AuthService } from "app/_services/auth.service"
import { NotificationsService } from "angular2-notifications"
import { TestHelper } from "app/_test.libs/test-helper"
import { ComponentFixture } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { Observable } from "rxjs/Rx"
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from "@angular/router"
import { Location } from '@angular/common'
import { UserModel } from "app/_models/user.model"


describe('RegisterComponent', () => {

    let location: Location
    let router: Router
    let fixture: ComponentFixture<RegisterComponent>
    let submitSpy = jasmine.createSpy('submit').and.returnValue(Observable.throw(new Error('error!')))
    let mockService: AuthService
    let toasterMock: NotificationsService
    let component: RegisterComponent
    

    beforeEach(async(() => {         
        mockService = TestHelper.mock(AuthService, 'AuthService')
        mockService.register = submitSpy
        toasterMock = TestHelper.mock(NotificationsService, 'NotificationsService')
        toasterMock.error = jasmine.createSpy('error').and.returnValue('')

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule, FormsModule],
            declarations: [RegisterComponent],
            providers: [   
                { provide: Router, useValue: RouterTestingModule.withRoutes([]) },
                { provide: AuthService, useValue: mockService },
                { provide: NotificationsService, useValue: toasterMock },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then( () => {
            router = TestBed.get(Router)
            location = TestBed.get(Location)
            fixture = TestBed.createComponent(RegisterComponent)
            router.initialNavigation
            component = fixture.componentInstance
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should submit correct data', async( () => {        
        component.email = "fake@email.com"
        component.password = "fakePass456"
        component.firstName = "fname"
        component.surName = "sname"
        component.isEducator = "true"
        let expected = new UserModel({
            firstName: component.firstName,
            surName: component.surName,
            email: component.email,
            password: component.password,
            isEducator: component.isEducator
        })
        
        component.submit()
        expect(mockService.register).toHaveBeenCalledTimes(1)    
        expect(mockService.register).toHaveBeenCalledWith(expected)
    })) 

    it('should switch tab', async( () => {        
        component.tab.subscribe( (value) => {
            expect(value).toBe(0)
        } )
        component.switchTab() 
    })) 

    it('should emit the supplied value on a loading event', async( () => {
        component.loadingEvent.subscribe( (value) => {
            expect(value).toBe(true)
        })         
        component.emitLoading(true)
    }))
})