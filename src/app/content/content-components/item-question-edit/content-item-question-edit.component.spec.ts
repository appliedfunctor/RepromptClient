

import { ContentItemQuestionEditComponent } from "app/content/content-components/item-question-edit/content-item-question-edit.component";
import { QuestionTypeService } from "app/_services/question-type.service";
import { ComponentFactoryResolver, NO_ERRORS_SCHEMA, ViewContainerRef, ViewChild, ComponentFactory } from "@angular/core";
import { async, TestBed  } from "@angular/core/testing";
import { TestHelper } from "app/_test.libs/test-helper";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DeleteConfirmDialog } from "app/dialogs/delete-confirm.dialog";
import { UnlinkConfirmDialog } from "app/dialogs/unlink-confirm.dialog";
import { QuestionEditMCSA } from "app/assessment-handlers/mcsa/question-edit-mcsa.component";
import { QuestionTestMCSA } from "app/assessment-handlers/mcsa/question-test-mcsa.component";
import { QuestionEditSort } from "app/assessment-handlers/sort/question-edit-sort.component";
import { QuestionTestSort } from "app/assessment-handlers/sort/question-test-sort.component";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";
import { FormsModule } from "@angular/forms";
import { ComponentFixture, fakeAsync } from "@angular/core/testing";
import { MdSelectModule, MdInputModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragulaModule } from "ng2-dragula";
import { ContentPackageService } from "app/_services/content-package.service";
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt";
import { authHttpServiceFactory } from "app/app.module";
import { Http, RequestOptions } from "@angular/http";
import { NotificationsService } from "angular2-notifications";
import { ShortenPipe } from "app/_pipes/shorten.pipe";

describe('ContentItemQuestionEditComponent', () => {
    let component: ContentItemQuestionEditComponent
    let componentFactoryResolver: ComponentFactoryResolver
    let fixture: ComponentFixture<ContentItemQuestionEditComponent>
    let service: QuestionTypeService
    let mockContentPackageService: ContentPackageService = TestHelper.mock(ContentPackageService, 'ContentPackageService')
    let mockNotificationsService: NotificationsService = TestHelper.mock(NotificationsService, 'NotificationsService')
    
   

    beforeEach(async(() => {         
        TestBed.configureTestingModule({
            declarations: [
                ContentItemQuestionEditComponent,
                QuestionEditMCSA,
                QuestionEditSort,
            ],
            imports: [FormsModule, MdSelectModule, BrowserAnimationsModule, MdInputModule, DragulaModule],
            providers: [                
                QuestionTypeService, 
                { provide: ContentPackageService, useValue: mockContentPackageService },
                { provide: NotificationsService, useValue: mockNotificationsService },
            ],
            //schemas: [ NO_ERRORS_SCHEMA ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
              entryComponents: [
                QuestionEditMCSA,
                QuestionEditSort,
            ]
            }
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(ContentItemQuestionEditComponent)
            component = fixture.componentInstance   
            component.question = new QuestionModel({id: 5})            
            component.contentItem = new ContentItemModel({  id: 3, packageId: 4, name: "n", 
                                                             questions: [component.question], content: "c"})
            
        })

        
    }))

    it('should create', async(() => {        
        expect(component).toBeTruthy()
    }))

    it('should load the correct component based on MCSA key', async(() => {          
        fixture.detectChanges()   
        expect(component.host).toBeDefined()   
        component.questionType = component.questionTypes[0].code              
        component.ngOnChanges(null)
        expect(component.currentEditModule.constructor.name).toBe("QuestionEditMCSA") 
    }))

    it('should load the correct component based on Sort key', async(() => {         
        fixture.detectChanges()     
        expect(component.host).toBeDefined()    
        component.questionType = component.questionTypes[1].code
        component.loadComponent()
        expect(component.currentEditModule.constructor.name).toBe("QuestionEditSort")
    }))
})