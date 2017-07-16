export class CohortModel {
    id: number
    ownerId: number
    name: String

    constructor(cohortData){
        this.id = cohortData.id ? cohortData.id : null;
        this.ownerId = cohortData.ownerId ? cohortData.ownerId : null;
        this.name = cohortData.name ? cohortData.name : "";
    }
}