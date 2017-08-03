import { UserModel } from "app/_models/user.model";
import { FileContainer } from "app/_models/file-container.model";

export class CohortModel implements FileContainer{
    id: number
    parentId: number
    ownerId: number
    name: string
    members: UserModel[]

    constructor(cohortData){
        this.id = cohortData.id ? cohortData.id : null
        this.parentId = cohortData.parentId ? cohortData.parentId : null
        this.ownerId = cohortData.ownerId ? cohortData.ownerId : null
        this.name = cohortData.name ? cohortData.name : ""
        this.members = cohortData.members ? cohortData.members : []
    }
}