import { StudyService } from "app/_services/study.service";
import { TestHelper } from "app/_test.libs/test-helper";
import { ManageComponent } from "app/manage/manage.component";
import { NotificationsService } from "angular2-notifications";
import { Observable } from "rxjs/Rx";
import { async } from "@angular/core/testing";
import { ExamModel } from "app/_models/exam.model";

describe('ManageComponent', () => {
    
    let mockService: StudyService = TestHelper.mock(StudyService, 'StudyService')
    let component: ManageComponent
    let mockNotificationsService: NotificationsService
    

    beforeEach(async(() => {
        mockService.getContentAssignedStatus = jasmine.createSpy('gcas').and.returnValues(Observable.of([new ExamModel({})]))
        mockService.enableContent = jasmine.createSpy('enableContent').and.returnValue(Observable.of(1))
        mockService.disableContent = jasmine.createSpy('disableContent').and.returnValue(Observable.of(1))
        mockNotificationsService = TestHelper.mock(NotificationsService, 'NotificationsService')
        component = new ManageComponent(mockService, mockNotificationsService)
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialise', () => {
        component.ngOnInit()
        expect(component).toBeTruthy()
        expect(mockService.getContentAssignedStatus).toHaveBeenCalledTimes(1)
    })

    it('should destroy', () => {
        component.active = true
        component.ngOnDestroy()
        expect(component.active).toBeFalsy()
    })

    it('should toggle exam status to on', async(() => {
        let exam = new ExamModel({id: 6, enabled: false})
        component.items = [exam]
        component.toggleExamStatus(exam)
        expect(component.items[0].enabled).toBeTruthy()
        expect(mockService.enableContent).toHaveBeenCalledTimes(1)
        expect(mockService.enableContent).toHaveBeenCalledWith(6)
    }))

    it('should toggle exam status to off', async(() => {
        let exam = new ExamModel({id: 8, enabled: true})
        component.items = [exam]
        component.toggleExamStatus(exam)
        expect(component.items[0].enabled).toBeFalsy()
        expect(mockService.disableContent).toHaveBeenCalledTimes(1)
        expect(mockService.disableContent).toHaveBeenCalledWith(8)
    }))

    describe('Manage Component failure responses', () => {
        beforeEach(async(() => {
            mockService.getContentAssignedStatus = jasmine.createSpy('gcas').and.returnValues(Observable.throw(''))
            mockService.enableContent = jasmine.createSpy('enableContent').and.returnValue(Observable.throw(''))
            mockService.disableContent = jasmine.createSpy('disableContent').and.returnValue(Observable.throw(''))
            mockNotificationsService = TestHelper.mock(NotificationsService, 'NotificationsService')
            mockNotificationsService.error = jasmine.createSpy('disableContent').and.returnValue(Observable.of(1))
            component = new ManageComponent(mockService, mockNotificationsService)
        }))

        it('should initialise', () => {
            component.ngOnInit()
            expect(component).toBeTruthy()
            expect(mockNotificationsService.error).toHaveBeenCalledTimes(1)
        })

        it('should handle rror when toggling exam status to on', async(() => {
            let exam = new ExamModel({id: 6, enabled: false})
            component.items = [exam]
            component.toggleExamStatus(exam)
            expect(mockNotificationsService.error).toHaveBeenCalledTimes(1)
        }))
    
        it('should handle rror when toggling exam status to off', async(() => {
            let exam = new ExamModel({id: 8, enabled: true})
            component.items = [exam]
            component.toggleExamStatus(exam)
            expect(mockNotificationsService.error).toHaveBeenCalledTimes(1)
        }))
    })

    
    
})