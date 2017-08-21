import { ExamHistoricalPointModel } from "app/_models/exam-historical-point.model"

export class ExamHistoryModel {

    name: string
    series: ExamHistoricalPointModel[]

    constructor(data) {
        this.name = data.name ? data.name : "?"
        this.series = data.series ? data.series : null
    }
}