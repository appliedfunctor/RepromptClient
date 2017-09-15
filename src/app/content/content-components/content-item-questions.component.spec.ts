import { ContentPackageService } from "app/_services/content-package.service";
import { MdDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { Observable } from "rxjs/Rx";
import { TestHelper } from "app/_test.libs/test-helper";
import { async } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { ContentItemQuestionsComponent } from "app/content/content-components/content-item-questions.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SummaryPipe } from "app/_pipes/summary.pipe";
import { QuestionModel } from "app/_models/question.model";
import { ShortenPipe } from "app/_pipes/shorten.pipe";

describe('ContentItemQuestionsComponent', () => {
    let mockService: ContentPackageService
    let mockDialog: MdDialog
    let mockNotify: NotificationsService
    let fixture
    let component: ContentItemQuestionsComponent

    beforeEach(async(() => {         
        mockService = TestHelper.mock(ContentPackageService, 'ContentPackageService')
        mockService.getItem = jasmine.createSpy('getItem').and.returnValue(Observable.of(''))
        mockService.deleteQuestion = jasmine.createSpy('deleteQuestion').and.returnValue(Observable.of(1))
        mockDialog = TestHelper.mock(MdDialog, 'MdDialog')
        mockDialog.open = jasmine.createSpy('open').and.returnValue({
            componentInstance: {item: "", container: "", action: ""},
            afterClosed: jasmine.createSpy('afterClosed').and.returnValue(Observable.of(true))
        })
        mockNotify = TestHelper.mock(NotificationsService, 'NotificationsService')


        TestBed.configureTestingModule({
            declarations: [
                ContentItemQuestionsComponent, 
                SummaryPipe,
            ],
            imports: [FormsModule],
            providers: [                           
                { provide: ContentPackageService, useValue: mockService },
                { provide: NotificationsService, useValue: mockNotify },   
                { provide: MdDialog, useValue: mockDialog },
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(ContentItemQuestionsComponent)
            component = fixture.componentInstance       
        })
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should resort questions on data change', () => {
        let a = new QuestionModel({question: "A"})
        let b = new QuestionModel({question: "B"})
        let c = new QuestionModel({question: "C"})
        component.currentData.questions = [c, a, b]
        component.ngOnChanges(null)
        expect(component.currentData.questions.length).toBe(3)
        expect(component.currentData.questions[0]).toBe(a)
        expect(component.currentData.questions[1]).toBe(b)
        expect(component.currentData.questions[2]).toBe(c)
    })

    it('should make a service call to load Questions', () => {   
        component.currentData.id = 88      
        component.loadQuestions()
        expect(mockService.getItem).toHaveBeenCalledTimes(1)
    })

    it('should emit on selected question change', async() => {  
        let question = new QuestionModel({id: 5})     
        component.questionSelected.subscribe( (value) => {
            expect(value).toBe(question)
        })        
        component.currentQuestion =  new QuestionModel({id: 9}) 
        component.selectQuestion(question)
        expect(component.currentQuestion.id).toBe(5)
    })

    it('should emit on selected question change with matched id', async() => {  
        let question = new QuestionModel({id: 5})     
        component.questionSelected.subscribe( (value) => {
            expect(value).toEqual(new QuestionModel({}) )
        })        
        component.currentQuestion =  new QuestionModel({id: 5}) 
        component.selectQuestion(question)
        expect(component.currentQuestion.id).toBe(null)
    })

    it('should open a dialog to confirm Item Delete', () => {
        component.currentQuestion = new QuestionModel({id: 66})        
        component.verifyDeleteQuestion(component.currentQuestion)
        expect(mockDialog.open).toHaveBeenCalledTimes(1)
        expect(mockService.deleteQuestion).toHaveBeenCalledTimes(1)
    })
    
})