import { Injectable } from "@angular/core"
import { QuestionEditMCSA } from "app/assessment-handlers/mcsa/question-edit-mcsa.component"
import { QuestionEditSort } from "app/assessment-handlers/sort/question-edit-sort.component"
import { QuestionTestMCSA } from "app/assessment-handlers/mcsa/question-test-mcsa.component"
import { QuestionTestSort } from "app/assessment-handlers/sort/question-test-sort.component"

@Injectable()
export class QuestionTypeService {

    getQuestionEditors() {
        return  [
                    { code: "MCSA", name: "Mutiple choice, single answer", component: QuestionEditMCSA },
                    { code: "SORT", name: "Sort into order", component: QuestionEditSort },                        
                ]
    }

    getQuestionAssessors() {
        return  [
                    { code: "MCSA", name: "Mutiple choice, single answer", component: QuestionTestMCSA },
                    { code: "SORT", name: "Sort into order", component: QuestionTestSort },   
                ]
    }
}