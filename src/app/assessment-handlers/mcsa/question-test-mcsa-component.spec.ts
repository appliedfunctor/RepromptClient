import { QuestionTestMCSA } from "app/assessment-handlers/mcsa/question-test-mcsa.component";
import { QuestionModel } from "app/_models/question.model";
import { AnswerModel } from "app/_models/answer.model";
import { fakeAsync } from "@angular/core/testing";

describe('QuestionTestMCSA', () => {
    
    let component: QuestionTestMCSA
    let testQuestion = new QuestionModel({id: 9, question: "example Question", itemId: 5, 
    answers: [
        new AnswerModel({id: 1, questionId: 9, answer: "Some ans 1", correct: true}),
        new AnswerModel({id: 2, questionId: 9, answer: "Some ans 2", correct: false}),
        new AnswerModel({id: 3, questionId: 9, answer: "Some ans 3", correct: false}),
        new AnswerModel({id: 4, questionId: 9, answer: "Some ans 4", correct: false}),
    ]})

    beforeEach(() => { 
        component = new QuestionTestMCSA()
        component.question = testQuestion
      })

    it('should correctly mark a correct answer', fakeAsync( () => {
        component.selectedAnswer = 1        
        expect(component.mark()).toBe(1)   
    }))

    it('should correctly mark an incorrect answer', fakeAsync( () => {
        component.selectedAnswer = 2       
        expect(component.mark()).toBe(-0.25)   
    }))
  
    it('should output score if submit called', fakeAsync( () => {        
        component.selectedAnswer = 1      
        component.marked.subscribe( (score) => expect(score).toBe(1)) 
        component.submit()
    }))
})