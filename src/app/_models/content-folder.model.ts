import { UserModel } from "app/_models/user.model";
import { FileContainer } from "app/_models/file-container.model";
import { ContentPackageModel } from "app/_models/content-package.model";

export class ContentFolderModel implements FileContainer{
    id: number
    parentId: number
    ownerId: number
    name: string
    members: ContentPackageModel[]

    constructor(data){
        this.id = data.id ? data.id : null
        this.parentId = data.parentId ? data.parentId : null
        this.ownerId = data.ownerId ? data.ownerId : null
        this.name = data.name ? data.name : ""
        this.members = data.members ? data.members : []
    }
}