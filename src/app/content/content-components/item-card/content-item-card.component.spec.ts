import { async } from "@angular/core/testing";
import { ContentItemCardComponent } from "app/content/content-components/item-card/content-item-card.component";
import { Paths } from "app/app.paths";
import { ContentItemModel } from "app/_models/content-item.model";

describe('ContentItemQuestionEditComponent', () => {
    let path: Paths = new Paths()
    let component: ContentItemCardComponent = new ContentItemCardComponent(path)

    it('should create', async(() => {        
        expect(component).toBeTruthy()
    }))

    it('should emit content item when notifyTest is called', async(() => {  
        component.contentItem = new ContentItemModel({id: 56})
        component.test.subscribe( (value) => {
            expect(value).toBe(component.contentItem)
        })      
        component.notifyTest()
    }))

    it('should set the base path when contentItem changes', async(() => {  
        component.contentItem = new ContentItemModel({id: 97, imageUrl: "path/to/img"})
        component.ngOnChanges({contentItem: "x"})
        expect(component.base).toBe(path.getBaseUrl(component.contentItem.imageUrl))
    }))




})