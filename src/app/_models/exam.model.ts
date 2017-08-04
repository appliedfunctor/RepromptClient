import { CohortModel } from "app/_models/cohort.model";
import { ContentPackageModel } from "app/_models/content-package.model";

export class ExamModel {
    id: number
    name: string
    date: Date
    cohorts: CohortModel[]
    packages: ContentPackageModel[]

    constructor(data) {
        this.id = data.id ? data.id : null
        this.name = data.name ? data.name : ""
        this.date = data.date ? data.date : null
        this.cohorts = data.cohorts ? data.cohorts : []
        this.packages = data.packages ? data.packages : []
    }

    getSearchValues() {
        return [this.name, this.getDate()]
    }

    /** 
     * https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
     * accessed 04/08/2017
     * 
     * @returns 
     * @memberof ExamModel
     */
    getDate() {
        var mm = this.date.getMonth() + 1
        var dd = this.date.getDate()

        return [(dd>9 ? '' : '0') + dd,
                (mm>9 ? '' : '0') + mm,
                this.date.getFullYear()                
                ].join('/');
    }

}