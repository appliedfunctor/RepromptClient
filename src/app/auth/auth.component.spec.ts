import { AuthComponent } from "app/auth/auth.component"
import { fakeAsync } from "@angular/core/testing";

describe('QuestionEditMCSA', () => {
    
    let component: AuthComponent

    beforeEach(() => { 
        component = new AuthComponent()
      })

    it('should switch from tab 0 to 1', fakeAsync( () => {
        component.selectedTab = 0
        component.toggleTab()
        expect(component.selectedTab).toBe(1)   
    }))

    it('should switch from tab 1 to 0', fakeAsync( () => {
        component.selectedTab = 1
        component.toggleTab()
        expect(component.selectedTab).toBe(0)   
    }))

    it('should set tab from event', fakeAsync( () => {
        component.selectedTab = 1
        component.onSelectChange({index:5})
        expect(component.selectedTab).toBe(5)   
    }))

    it('should set loading state to true', fakeAsync( () => {
        component.loading = false
        component.setLoading(true)
        expect(component.loading).toBe(true)   
    }))

    it('should set loading state to false', fakeAsync( () => {
        component.loading = true
        component.setLoading(false)
        expect(component.loading).toBe(false)   
    }))

})