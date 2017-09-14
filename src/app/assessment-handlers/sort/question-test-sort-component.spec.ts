import { QuestionTestSort } from "app/assessment-handlers/sort/question-test-sort.component";
import { QuestionModel } from "app/_models/question.model";
import { AnswerModel } from "app/_models/answer.model";
import { TestHelper } from "app/_test.libs/test-helper";
import { DragulaService } from "ng2-dragula";
import { Mobile } from "app/libs/Mobile";
import { fakeAsync } from "@angular/core/testing";
import { Observable } from "rxjs/Rx";
import { EventEmitter } from "@angular/core/";
import { async } from "@angular/core/testing";

describe('QuestionTestSort', () => {
    
    let component: QuestionTestSort
    let testQuestion = new QuestionModel({id: 9, question: "example Question", itemId: 5})
    let mockDragService
    let mockMobile
    let emitter: EventEmitter<any> = new EventEmitter()

    let correctAnswers = [
        new AnswerModel({id: 1, questionId: 9, answer: "Some ans 1", correct: false, sequence: 0}),
        new AnswerModel({id: 2, questionId: 9, answer: "Some ans 2", correct: false, sequence: 1}),
        new AnswerModel({id: 3, questionId: 9, answer: "Some ans 3", correct: false, sequence: 2}),
        new AnswerModel({id: 4, questionId: 9, answer: "Some ans 4", correct: false, sequence: 3}),
    ]

    let partiallyCorrectAnswers = [
        new AnswerModel({id: 1, questionId: 9, answer: "Some ans 1", correct: false, sequence: 0}),
        new AnswerModel({id: 2, questionId: 9, answer: "Some ans 2", correct: false, sequence: 1}),
        new AnswerModel({id: 4, questionId: 9, answer: "Some ans 4", correct: false, sequence: 3}),
        new AnswerModel({id: 3, questionId: 9, answer: "Some ans 3", correct: false, sequence: 2}),
    ]

    let incorrectAnswers = [
        new AnswerModel({id: 4, questionId: 9, answer: "Some ans 4", correct: false, sequence: 3}),
        new AnswerModel({id: 3, questionId: 9, answer: "Some ans 3", correct: false, sequence: 2}),
        new AnswerModel({id: 2, questionId: 9, answer: "Some ans 2", correct: false, sequence: 1}),
        new AnswerModel({id: 1, questionId: 9, answer: "Some ans 1", correct: false, sequence: 0}),
    ]

    beforeEach(() => { 
        mockDragService = TestHelper.mock(DragulaService, 'DragulaService')
        mockDragService.drag = emitter
        mockDragService.drop = emitter
        mockMobile = TestHelper.mock(Mobile, 'mobile')
        component = new QuestionTestSort(mockDragService, mockMobile)
        component.question = testQuestion
        component.question.answers = correctAnswers
        mockDragService.drag.emit(true)
        mockDragService.drop.emit(true)
    })

    it('should correctly mark a correct answer', fakeAsync( () => {        
        expect(component.mark()).toBe(1)
    }))

    it('should correctly mark a partially correct answer', fakeAsync( () => {
        component.question.answers = partiallyCorrectAnswers
        expect(component.mark()).toBe(0.5)
    }))
    
    it('should correctly mark an incorrect answer', fakeAsync( () => {
        component.question.answers = incorrectAnswers
        expect(component.mark()).toBe(0)
    }))

    it('emit the score on submit', async( () => {
        component.marked.subscribe( mark => {
            expect(mark).toBe(1)
        })
        component.submit()
    }))
})