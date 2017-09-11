import { ContentPackageService } from "app/_services/content-package.service"
import { fakeAsync } from "@angular/core/testing"
import { TestBed } from "@angular/core/testing"
import { Http, BaseRequestOptions, Response, ResponseOptions, JsonpModule, Headers } from "@angular/http"
import { Observable } from "rxjs/Rx"
import { MockBackend } from '@angular/http/testing'
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt"
import { QuestionEditMCSA } from "app/assessment-handlers/mcsa/question-edit-mcsa.component"
import { ContentItemModel } from "app/_models/content-item.model"
import { Paths } from "app/app.paths"
import { AnswerModel } from "app/_models/answer.model"
import { Test } from "app/_test.libs/test"
import { QuestionModel } from "app/_models/question.model";
import { async } from "@angular/core/testing";
import { NotificationsService } from "angular2-notifications";


describe('QuestionEditMCSA', () => {
    
    let service: ContentPackageService
    let component: QuestionEditMCSA
    let mockToast: NotificationsService

    beforeEach(() => { 
        service = Test.mock(ContentPackageService, 'ContentPackageService')
        mockToast = Test.mock(NotificationsService, 'NotificationsService')
        component = new QuestionEditMCSA(service, mockToast)
        component.contentItem = new ContentItemModel({})
      })

    it('should make a valid save call', fakeAsync( () => {
        service.saveQuestion = jasmine.createSpy('saveQuestion').and.returnValue(Observable.of(''))
        component.submit()
        expect(service.saveQuestion).toHaveBeenCalledTimes(1)    
        expect(service.saveQuestion).toHaveBeenCalledWith(component.question)   
    }))

    it('should delete all exisiting removed answers', fakeAsync( () => {
        service.saveQuestion = jasmine.createSpy('saveQuestion').and.returnValue(Observable.of(''))
        service.deleteAnswer = jasmine.createSpy('deleteAnswer').and.returnValue(Observable.of(''))
        component.answerDeletions = [new AnswerModel({}), new AnswerModel({}), new AnswerModel({})]
        component.submit()
        expect(service.deleteAnswer).toHaveBeenCalledTimes(3)    
    }))

    it('should add a distractor', fakeAsync( () => {        
        component.distractors = [new AnswerModel({id:1})]
        let previousSize = component.distractors.length
        component.addDistractor()
        expect(component.distractors.length).toBe(previousSize + 1)
    }))

    it('should remove a distractor if exists', fakeAsync( () => {        
        component.distractors = [new AnswerModel({id:1}), new AnswerModel({id:2}), new AnswerModel({id:3})]
        let previousSize = component.distractors.length
        component.removeDistractor()
        expect(component.distractors.length).toBe(previousSize -1)
    }))

    it('should not remove a distractor if less than 1 exists', fakeAsync( () => {        
        component.distractors = [new AnswerModel({id:1})]
        let previousSize = component.distractors.length
        component.removeDistractor()
        expect(component.distractors.length).toBe(previousSize)
    }))

    it('should pend answer for deletion if removing it as a distractor', fakeAsync( () => {
        service.saveQuestion = jasmine.createSpy('saveQuestion').and.returnValue(Observable.of(''))
        service.deleteAnswer = jasmine.createSpy('deleteAnswer').and.returnValue(Observable.of(''))
        component.distractors = [new AnswerModel({id:1}), new AnswerModel({id:2}), new AnswerModel({id:3})]        
        component.answerDeletions = [new AnswerModel({}), new AnswerModel({}), new AnswerModel({})]
        let previousSize = component.answerDeletions.length
        component.removeDistractor()
        expect(component.answerDeletions.length).toBe(previousSize + 1)
    }))

    it('should initialise the question', fakeAsync( () => {        
        component.question.itemId = null
        component.initialiseQuestion()
        expect(component.question.itemId).toBe(component.contentItem.id)
    }))
    
    it('should initialise answers when there aren\'t any', fakeAsync( () => {        
        component.question.answers = []
        component.initialiseAnswers()
        expect(component.question.answers.length).toBe(2)
        expect(component.question.answers[0].correct).toBeTruthy
        expect(component.question.answers[1].correct).toBeFalsy
    }))

    it('should initialise answers when there are less than 2', fakeAsync( () => {        
        component.question.answers = [new AnswerModel({id:8,correct:true})]
        component.initialiseAnswers()
        expect(component.question.answers.length).toBe(2)
        expect(component.question.answers[0].correct).toBeTruthy
        expect(component.question.answers[0]).toBe(component.question.answers[0])
        expect(component.question.answers[1].correct).toBeFalsy
    }))

    it('should initialise answers when there are 2', fakeAsync( () => {        
        component.question.answers = [new AnswerModel({id:8,correct:true}), new AnswerModel({id:12,correct:false})]
        component.ngOnInit()
        expect(component.question.answers.length).toBe(2)
        expect(component.question.answers[0].correct).toBeTruthy        
        expect(component.question.answers[0]).toBe(component.question.answers[0])
        expect(component.question.answers[1].correct).toBeFalsy
        expect(component.question.answers[1]).toBe(component.question.answers[1])
    }))

    it('should initialise answers when there are 2, but incorrectly ordered', fakeAsync( () => {        
        let first = new AnswerModel({id:8,correct:true})
        let second = new AnswerModel({id:12,correct:false})
        component.question.answers = [second, first]
        expect(component.question.answers[0].correct).toBeFalsy 
        expect(component.question.answers[1].correct).toBeTruthy        
        component.initialiseAnswers()
        expect(component.question.answers.length).toBe(2)
        expect(component.question.answers[0].correct).toBeTruthy        
        expect(component.question.answers[1].correct).toBeFalsy             
        expect(component.question.answers[0]).toBe(first)     
        expect(component.question.answers[1]).toBe(second)
    }))

    it('should initialise answers when there are more than 2', fakeAsync( () => {  
        let first = new AnswerModel({id:8,correct:true})
        let second = new AnswerModel({id:12,correct:false})
        let third = new AnswerModel({id:13,correct:false})
        component.question.answers = [first, second, third]
        component.initialiseAnswers()
        expect(component.question.answers.length).toBe(3)
        expect(component.question.answers[0].correct).toBeTruthy        
        expect(component.question.answers[0]).toBe(first)
        expect(component.question.answers[1].correct).toBeFalsy
        expect(component.question.answers[1]).toBe(second)
        expect(component.question.answers[2].correct).toBeFalsy
        expect(component.question.answers[2]).toBe(third)
    }))

    it('should update on data change', async( () => {  
        let first = new AnswerModel({id:8,correct:true})
        component.question = new QuestionModel({id:6, question:"A question", answers: [first]})
        component.formVisible = true
        component.onDataChanged()
        expect(component.formVisible).toBeFalsy
        setTimeout(() => {
            expect(component.correctAnswer).toBe(first)
        })
    }))

    it('should deactivate on destroy', fakeAsync( () => {
        expect(component.active).toBeTruthy
        component.ngOnDestroy()
        expect(component.active).toBeFalsy
    }))
    
    
})