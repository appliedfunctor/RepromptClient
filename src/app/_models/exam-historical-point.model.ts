export class ExamHistoricalPointModel {
    
    name: Date
    value: number

    constructor(data) {
        this.name = data.name ? new Date(data.name) : null
        this.value = data.value ? data.value : null
    }
}