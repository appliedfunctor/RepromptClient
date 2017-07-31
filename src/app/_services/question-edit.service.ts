import { Injectable } from "@angular/core";
import { QuestionEditMCSA } from "app/content/question-handlers/question-edit-mcsa.component";
import { QuestionEditSort } from "app/content/question-handlers/question-edit-sort.component";

@Injectable()
export class QuestionEditService {

    getQuestionHandlers() {
        return [
                { code: "MCSA", name: "Mutiple choice, single answer", component: QuestionEditMCSA },
                { code: "SORT", name: "Sort into buckets", component: QuestionEditSort }                        
            ]
    }
}