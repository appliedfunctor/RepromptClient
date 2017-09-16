

import { ProgressComponent } from "app/progress/progress.component";
import { async } from "@angular/core/testing";
import { StudyService } from "app/_services/study.service";
import { NotificationsService } from "angular2-notifications";
import { TestHelper } from "app/_test.libs/test-helper";
import * as shape from 'd3-shape'
import { Observable } from "rxjs/Rx";

describe('ProgressComponent', () => {

    let component: ProgressComponent
    let mockService: StudyService
    let mockNotify: NotificationsService

    beforeEach(async(() => {
        mockService = TestHelper.mock(StudyService, 'StudyService')
        mockService.getHistoricalAssessmentDataByExam = jasmine.createSpy('ghabe').and.returnValue(Observable.of('1'))
        mockNotify = TestHelper.mock(NotificationsService, 'NotificationsService')
        component = new ProgressComponent(mockService, mockNotify)
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should toggle the graph from curveBasis to Linear', () => {
        component.curve = shape.curveBasis
        component.toggleSmoothing()
        expect(component.curve).toBe(shape.curveLinear)
    })

    it('should toggle the graph from Linear to curveBasis', () => {
        component.curve = shape.curveLinear
        component.toggleSmoothing()
        expect(component.curve).toBe(shape.curveBasis)
    })

    it('should intiialise and retrieve data', () => {
        component.ngOnInit()
        expect(mockService.getHistoricalAssessmentDataByExam).toHaveBeenCalledTimes(1)
    })

    describe('ProgressComponent handle failure responses', () => {
        beforeEach(async(() => {
            mockService = TestHelper.mock(StudyService, 'StudyService')
            mockService.getHistoricalAssessmentDataByExam = jasmine.createSpy('ghabe').and.returnValue(Observable.throw('1'))
            mockNotify = TestHelper.mock(NotificationsService, 'NotificationsService')
            component = new ProgressComponent(mockService, mockNotify)
        }))

        it('should intiialise and handle error on data retrieval', () => {
            component.ngOnInit()
            expect(mockService.getHistoricalAssessmentDataByExam).toHaveBeenCalledTimes(1)
        })

    })

})