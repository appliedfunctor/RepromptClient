import { SummaryPipe } from "app/_pipes/summary.pipe";

describe('SummaryPipe', () => {

    let component: SummaryPipe

    beforeAll( () => {
        component = new SummaryPipe()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should truncate if over threshold', () => {
        expect(component.transform('a b c d e f g h i j k l m n o p', '10')).toBe('a b c d e f g h i j...')
    })

    it('should not truncate if under threshold', () => {
        expect(component.transform('a b c d e f g h i j k l m n o p', '100')).toBe('a b c d e f g h i j k l m n o p')
    })
})