import { TestHelper } from "app/_test.libs/test-helper";
import { StudyComponent } from "app/study/study.component";
import { StudyService } from "app/_services/study.service";
import { NotificationsService } from "angular2-notifications";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs/Rx";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";

describe('StudyComponent', () => {
    
    let component: StudyComponent
    let mockService: StudyService
    let mockNotify: NotificationsService

    let q1 = new QuestionModel({id: 25})
    let q2 = new QuestionModel({id: 45})
    let q3 = new QuestionModel({id: 55})
    let q4 = new QuestionModel({id: 64})
    let q5 = new QuestionModel({id: 2})

    beforeEach(async(() => {
        mockService = TestHelper.mock(StudyService, 'StudyService')
        mockService.getContentItems = jasmine.createSpy('getAllCohorts').and.returnValue(Observable.of(new ContentItemModel({id: 76})))
        mockService.saveScoreData = jasmine.createSpy('saveScoreData').and.returnValue(Observable.of(new ContentItemModel({id: 76})))
        
        mockNotify = TestHelper.mock(NotificationsService, 'NotificationsService')
        mockNotify.error = jasmine.createSpy('error').and.returnValue(Observable.of('1'))
        mockNotify.alert = jasmine.createSpy('error').and.returnValue(Observable.of('1'))
        
        component = new StudyComponent(mockService, mockNotify)
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialise correctly', () => {
        component.ngOnInit()
        expect(mockService.getContentItems).toHaveBeenCalledTimes(1)
    })

    it('should destroy correctly', () => {
        component.ngOnDestroy()
        expect(component.active).toBe(false)
    })

    it('should push the score when marked and load the next question', () => {
        component.currentContent = new ContentItemModel({id: 6, questions: [q1, q2, q3, q4, q5]})
        component.test()
        component.marked(55)
        expect(component.currentScoring[0]).toBe(55)
    })

    it('should shuffle content', () => {        
        component.currentContent = new ContentItemModel({id: 6, questions: [q1, q2, q3, q4, q5]})
        component.test()
        expect(component.pendingQuestions.find(q => q.id === q1.id)).toBeTruthy
        expect(component.pendingQuestions.find(q => q.id === q2.id)).toBeTruthy
        expect(component.pendingQuestions.find(q => q.id === q3.id)).toBeTruthy
        expect(component.pendingQuestions.find(q => q.id === q4.id)).toBeTruthy
        expect(component.pendingQuestions.find(q => q.id === q5.id)).toBeTruthy
        expect(component.pendingQuestions[0].id === component.currentContent.questions[0].id 
            && component.pendingQuestions[1].id === component.currentContent.questions[1].id 
            && component.pendingQuestions[2].id === component.currentContent.questions[2].id 
            && component.pendingQuestions[3].id === component.currentContent.questions[3].id 
            && component.pendingQuestions[4].id === component.currentContent.questions[4].id 
        ).toBeFalsy()
    })
    
    it('should make service calls to persistScoreData', () => {
        component.currentContent = new ContentItemModel({id: 6, questions: [q1, q2, q3, q4, q5], score: 88})
        component.persistScoreData(82)
        expect(mockService.saveScoreData).toHaveBeenCalledTimes(1)
    })
    
    it('should make service calls to persistScoreData with a fail', () => {
        component.currentContent = new ContentItemModel({id: 6, questions: [q1, q2, q3, q4, q5], score: 88})
        component.test()
        component.pendingContent = []
        component.persistScoreData(45)
        expect(mockService.saveScoreData).toHaveBeenCalledTimes(1)
    })
    
    it('should handle clearing, marking and persisting score data when nextQuestion called without pending', () => {
        component.currentContent = new ContentItemModel({id: 6, questions: [q1, q2, q3, q4, q5], score: 88})
        component.test()
        component.pendingContent = []
        component.pendingQuestions = []
        component.currentScoring = [50]
        component.nextQuestion()
        //expect(mockService.saveScoreData).toHaveBeenCalledTimes(1)
        expect(component.currentQuestion).toBe(null)
    })

    

    describe('StudyComponent on failure', () => {
        beforeEach(async(() => {
            mockService = TestHelper.mock(StudyService, 'StudyService')
            mockService.getContentItems = jasmine.createSpy('getAllCohorts').and.returnValue(Observable.throw(''))
            mockService.saveScoreData = jasmine.createSpy('getAllCohorts').and.returnValue(Observable.throw(''))
            
            mockNotify = TestHelper.mock(NotificationsService, 'NotificationsService')
            mockNotify.error = jasmine.createSpy('error').and.returnValue(Observable.of('1'))
            mockNotify.alert = jasmine.createSpy('error').and.returnValue(Observable.of('1'))
            
            component = new StudyComponent(mockService, mockNotify)
        }))

        it('should handle initialise error response correctly', () => {
            component.ngOnInit()
            expect(mockNotify.error).toHaveBeenCalledTimes(1)
        })

        it('should handle failure response to persistScoreData', () => {
            component.currentContent = new ContentItemModel({id: 6, questions: [q1, q2, q3, q4, q5], score: 88})
            component.persistScoreData(82)
            expect(mockNotify.error).toHaveBeenCalledTimes(1)
        })
    })
})