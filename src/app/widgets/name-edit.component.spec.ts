import { async } from "@angular/core/testing";
import { NameEditComponent } from "app/widgets/name-edit.component";

describe('NameEditComponent', () => {

    let component: NameEditComponent

    beforeEach( async(() => {
        component = new NameEditComponent()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should emit on submit', async(() => {
        component.name = "Super Badger"
        component.valueChange.subscribe( value => {
            expect(value).toBe(component.name)
        })
        component.submit()
    }))

})