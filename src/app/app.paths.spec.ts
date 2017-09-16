import { Paths } from "app/app.paths";
import { async } from "@angular/core/testing";

describe('Paths', () => {

    let component: Paths

    beforeEach( async(() => {
        component = new Paths()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should return the correct url for dev', () => {
        expect(component.getUrl("FishFace")).toBe(component.http + component.base + 'FishFace')
    })

    it('should return the correct url for live', () => {
        expect(component.getUrl("http://FishFace")).toBe('http://FishFace')
    })

    it('should return the correct base url for dev', () => {
        expect(component.getBaseUrl("FishFace")).toBe(component.http + component.base + '/')
    })

    it('should return the correct base url for live', () => {
        expect(component.getBaseUrl("http://FishFace")).toBe('')
    })

    it('should return the correct base for dev', () => {
        expect(component.getBase()).toBe(component.http + component.base + '/')
    })
})