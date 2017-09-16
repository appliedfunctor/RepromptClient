import { TestDeliveryComponent } from "app/study/test-delivery.component";
import { ComponentFixture } from "@angular/core/testing";
import { async } from "@angular/core/testing";
import { QuestionTypeService } from "app/_services/question-type.service";
import { TestBed } from "@angular/core/testing";
import { TestHelper } from "app/_test.libs/test-helper";
import { QuestionModel } from "app/_models/question.model";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { FormsModule } from "@angular/forms";
import { MdSelectModule, MdInputModule, MdRadioModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragulaModule } from "ng2-dragula";
import { QuestionTestMCSA } from "app/assessment-handlers/mcsa/question-test-mcsa.component";
import { QuestionTestSort } from "app/assessment-handlers/sort/question-test-sort.component";

describe('TestDeliveryComponent', () => {
    
    let fixture: ComponentFixture<TestDeliveryComponent>
    let component: TestDeliveryComponent
    

    beforeEach(async(() => {         
        TestBed.configureTestingModule({
            declarations: [TestDeliveryComponent, QuestionTestMCSA, QuestionTestSort],
            imports: [FormsModule, MdRadioModule, MdSelectModule, BrowserAnimationsModule, MdInputModule, DragulaModule],
            providers: [   
                QuestionTypeService,
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
              entryComponents: [
                QuestionTestMCSA,
                QuestionTestSort,
                
            ]}
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(TestDeliveryComponent)
            component = fixture.componentInstance
        })

        
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialise', () => {
        component.ngOnInit()
        expect(component).toBeTruthy()
    })

    it('should initialise and load component', () => {
        component.currentQuestion = new QuestionModel({id: 6, format: 'SORT'})  
        component.questionType = 'SORT'      
        component.ngOnInit()
        expect(component.currentTestModule).toBeTruthy()
        expect(component.currentTestModule.constructor.name).toBe("QuestionTestSort")
    })

    it('should reload data on change', () => {
        component.currentQuestion = new QuestionModel({id: 6, format: 'SORT'})  
        component.questionType = 'SORT'   
        component.ngOnInit()
        component.currentQuestion = new QuestionModel({id: 8, format: 'MCSA'}) 
        component.ngOnChanges()
        expect(component.currentTestModule.constructor.name).toBe("QuestionTestMCSA")
    })

    it('should reload the question on change if no type change', () => {
        component.currentQuestion = new QuestionModel({id: 6, format: 'SORT'})  
        component.questionType = 'SORT'   
        component.ngOnInit()
        component.currentQuestion = new QuestionModel({id: 8, format: 'SORT'}) 
        component.ngOnChanges()
        expect(component.currentTestModule.question).toBe(component.currentQuestion)
    })

    it('should set the question type if currentTestModule is null', () => {
        component.currentQuestion = new QuestionModel({id: 6, format: 'SORT'})  
        component.questionType = 'SORT'   
        component.ngOnInit()
        component.currentQuestion = new QuestionModel({id: 8, format: 'MCSA'}) 
        component.currentTestModule = null
        component.ngOnChanges()
        expect(component.questionType).toBe('MCSA')
    })

        
})