import { QuestionMarker } from "app/_models/question-marker.type"
import { Component, EventEmitter, Output, Input } from "@angular/core"
import { ContentItemModel } from "app/_models/content-item.model"
import { QuestionModel } from "app/_models/question.model"
import { QuestionAssessor } from "app/_models/question-assessor.type"
import { DragulaService } from "ng2-dragula";
import { Mobile } from "app/libs/Mobile";

@Component({
    selector: 'question-test-sort',
    templateUrl: 'question-test-sort.component.html',
    providers: [Mobile]
})
export class QuestionTestSort implements QuestionAssessor  {
    @Input() question: QuestionModel
    @Output() marked: EventEmitter<number> = new EventEmitter<number>()

    selectedAnswer: number
    removeSubscription
    active: boolean = true

    constructor(private dragulaService: DragulaService, private mobileLibs: Mobile) {
        let bag: any = this.dragulaService.find('first-bag')
        if (bag !== undefined ) this.dragulaService.destroy('first-bag')
        dragulaService.setOptions('first-bag', {
            removeOnSpill: false
        })

        dragulaService.drag.takeWhile( () => this.active ).subscribe( value => {
            this.mobileLibs.preventMobileScreenDrag()
        })

        dragulaService.drop.takeWhile( () => this.active ).subscribe( value => {
            this.mobileLibs.enableMobileScreenDrag()
        })
    }

    ngOnDestroy() {
        this.active = false
    }

    mark(): number {
        if(this.question.answers.length < 1) { return 0 }
        let correctlyPositioned: number[] = this.question.answers.map( (answer, index) => {
            console.log(`answer.sequence: ${answer.sequence}, index: ${index}`)
            return answer.sequence == index ? 1 : 0 
        })
        let total = correctlyPositioned.reduce( (acc, elem) => acc + elem )
        return total / correctlyPositioned.length
    }

    submit() {        
        let score = this.mark()
        this.marked.emit(score)
    }

}