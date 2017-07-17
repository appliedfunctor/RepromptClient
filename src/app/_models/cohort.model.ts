export class CohortModel {
    id: number
    parentId: number
    ownerId: number
    name: String

    constructor(cohortData){
        this.id = cohortData.id ? cohortData.id : null;
        this.parentId = cohortData.parentId ? cohortData.parentId : null;
        this.ownerId = cohortData.ownerId ? cohortData.ownerId : null;
        this.name = cohortData.name ? cohortData.name : "";
    }
}