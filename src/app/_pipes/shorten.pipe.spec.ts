import { ShortenPipe } from "app/_pipes/shorten.pipe";

describe('ShortenPipe', () => {

    let component: ShortenPipe

    beforeAll( () => {
        component = new ShortenPipe()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should transform input into a line breakable string', () => {
        expect(component.transform('a/b/c', '3')).toBe('a / b / c')
    })

    it('should not transform input into a line breakable string below char threshold', () => {
        expect(component.transform('a/b/c', '6')).toBe('a/b/c')
    })
})