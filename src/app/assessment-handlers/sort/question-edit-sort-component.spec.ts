import { QuestionModel } from "app/_models/question.model";
import { AnswerModel } from "app/_models/answer.model";
import { Test } from "app/_test.libs/Test";
import { DragulaService } from "ng2-dragula";
import { Mobile } from "app/libs/Mobile";
import { fakeAsync } from "@angular/core/testing";
import { Observable } from "rxjs/Rx";
import { EventEmitter } from "@angular/core/";
import { async } from "@angular/core/testing";
import { QuestionEditSort } from "app/assessment-handlers/sort/question-edit-sort.component";
import { ContentPackageService } from "app/_services/content-package.service";
import { ContentItemModel } from "app/_models/content-item.model";
import { NotificationsService } from "angular2-notifications";

describe('QuestionTestSort', () => {
    
    let component: QuestionEditSort
    let mockService: ContentPackageService
    let testQuestion = new QuestionModel({id: 9, question: "example Question", itemId: 5})
    let mockDragService
    let mockMobile
    let mockToast
    let emitter: EventEmitter<any> = new EventEmitter()
    let contentItem = new ContentItemModel({id: 10, packageId: 5, name: "x", content: "Y",
                                            enabled: true, questions: [testQuestion]})

    let correctAnswers = [
        new AnswerModel({id: 1, questionId: 9, answer: "Some ans 1", correct: false, sequence: 0}),
        new AnswerModel({id: 2, questionId: 9, answer: "Some ans 2", correct: false, sequence: 1}),
        new AnswerModel({id: 3, questionId: 9, answer: "Some ans 3", correct: false, sequence: 2}),
        new AnswerModel({id: 4, questionId: 9, answer: "Some ans 4", correct: false, sequence: 3}),
    ]

    beforeEach(() => {         
        mockDragService = Test.mock(DragulaService, 'DragulaService')
        mockDragService.drag = emitter
        mockDragService.drop = emitter
        mockDragService.removeModel = emitter
        mockService = Test.mock(ContentPackageService, 'ContentPackageService')
        mockMobile = Test.mock(Mobile, 'mobile')
        mockToast = Test.mock(NotificationsService, 'NotificationsService')
        component = new QuestionEditSort(mockDragService, mockService, mockMobile, mockToast)
        component.question = testQuestion
        component.contentItem = contentItem
        component.question.answers = correctAnswers
        component.question.question = "Something"
        component.ngOnInit()
        
        //mockDragService.removeModel.emit([1, 2, 3])
        //mockDragService.drag.emit(true)
        // mockDragService.drop.emit(true)
    })

    it('should make a valid save call', fakeAsync( () => {
        mockService.saveQuestion = jasmine.createSpy('saveQuestion').and.returnValue(Observable.of(''))
        component.submit()
        expect(mockService.saveQuestion).toHaveBeenCalledTimes(1)    
        expect(mockService.saveQuestion).toHaveBeenCalledWith(component.question)   
    }))

    it('should make http calls to delete removed items on submit', fakeAsync( () => {
        mockService.saveQuestion = jasmine.createSpy('saveQuestion').and.returnValue(Observable.of(''))
        mockService.deleteAnswer = jasmine.createSpy('deleteAnswer').and.returnValue(Observable.of(''))
        component.answerDeletions = [new AnswerModel({}), new AnswerModel({}), new AnswerModel({})]
        component.submit()
        expect(mockService.deleteAnswer).toHaveBeenCalledTimes(3)    
    }))

    it('should error on submit if no question exists', fakeAsync( () => {
        component.question.question = ""
        component.submit()
        expect(component.error).toBeTruthy
        expect(component.errorMessage).toBe("You must provide a question")
    }))

    it('should error on submit if less than two answers exist', fakeAsync( () => {        
        component.items = ["value"]
        component.submit()
        expect(component.error).toBeTruthy
        expect(component.errorMessage).toBe("You need at least two items to order")
    }))

    it('should add an item', fakeAsync( () => {        
        component.items = ["1", "2", "3"]
        let previousSize = component.items.length
        component.newElement = "4"
        component.addItem()
        expect(component.items.length).toBe(previousSize + 1)
    }))

    it('should pend existing answer for deletion if removing it', fakeAsync( () => {
        let previousSize = component.answerDeletions.length
        component.onRemoveItem([{innerHTML: correctAnswers[0].answer}, "src"])
        expect(component.answerDeletions.length).toBe(previousSize + 1)
    }))

    it('should deactivate on destroy', fakeAsync( () => {
        expect(component.active).toBeTruthy
        component.ngOnDestroy()
        expect(component.active).toBeFalsy
    }))
    
    it('should reinitialise question and answer data onDataChanged', fakeAsync( () => {
        component.question.format = "MCSA"
        component.onDataChanged()
        expect(component.question.format).toBe("SORT")
    }))
})