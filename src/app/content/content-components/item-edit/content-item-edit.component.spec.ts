import { async, TestBed } from "@angular/core/testing";
import { ContentItemEditComponent } from "app/content/content-components/item-edit/content-item-edit.component";
import { ComponentFixture } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MdInputModule } from "@angular/material";
import { FileUploadModule, EditorModule } from "primeng/primeng";
import { ContentItemModel } from "app/_models/content-item.model";
import { ShortenPipe } from "app/_pipes/shorten.pipe";

describe('ContentItemQuestionEditComponent', () => {
    let component: ContentItemEditComponent
    let fixture: ComponentFixture<ContentItemEditComponent>
    
    beforeEach(async(() => {         
        TestBed.configureTestingModule({
            declarations: [
                ContentItemEditComponent,                
                ShortenPipe,
            ],
            imports: [FormsModule, MdInputModule, FileUploadModule, EditorModule],
            providers: [                
            ],
            //schemas: [ NO_ERRORS_SCHEMA ],
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(ContentItemEditComponent)
            component = fixture.componentInstance
        })

        
    }))

    it('should create', async(() => {        
        expect(component).toBeTruthy()
    }))

    it('should emit current data on a notifyChange call', async(() => { 
        component.currentData = new ContentItemModel({id: 2})
        component.valueChange.subscribe( (value) => {
            expect(value.id).toBe(2)
        })
        component.notifyChange()       
    }))

    it('should emit current data on a fileUpload call if object is valid', async(() => { 
        component.currentData = new ContentItemModel({id: 4})
        component.valueChange.subscribe( (value) => {
            expect(value.id).toBe(4)
        })
        component.fileUpload({files: [1,2,3]})       
    }))

    it('should emit current data on load', async(() => { 
        component.currentData = new ContentItemModel({id: 2})
        component.valueChange.subscribe( (value) => {
            expect(value.id).toBe(2)
        })
        component.ngOnInit()       
    }))

    it('should emit submit if name is set and onSubmit called', async(() => { 
        component.currentData = new ContentItemModel({name: "Some name"})
        component.valueChange.subscribe( (value) => {
            expect(value).toBeTruthy
        })
        component.onSubmit()       
    }))
})