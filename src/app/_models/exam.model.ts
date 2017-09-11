import { CohortModel } from "app/_models/cohort.model";
import { ContentPackageModel } from "app/_models/content-package.model";

export class ExamModel {
    id: number
    name: string
    examDate: string
    cohorts: CohortModel[]
    packages: ContentPackageModel[]
    active: boolean
    ownerId: number
    enabled: boolean

    constructor(data) {
        this.id = data.id ? data.id : null
        this.name = data.name ? data.name : ""
        this.examDate = data.examDate ? data.examDate : null
        this.cohorts = data.cohorts ? data.cohorts : []
        this.packages = data.packages ? data.packages : []
        this.active = data.active ? data.active: true
        this.ownerId = data.ownerId ? data.ownerId : null
        this.enabled = data.enabled ? data.enabled: false
    }

    getSearchValues() {
        return [this.name, this.examDate]
    }

    static sortByName(a: ExamModel, b: ExamModel) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }
    
    static sortByDate(a: ExamModel, b: ExamModel) {
        if(a.examDate > b.examDate) { return 1 }
        if(a.examDate < b.examDate) { return -1 }
        return ExamModel.sortByName(a, b)
    }

}