import { FileElement } from 'app/_models/fileElement.type'
import { ContentItemModel } from 'app/_models/contentItem.model'

export class PackageModel implements FileElement {
    id: number
    name: string
    folderId: number
    ownerId: number
    content: ContentItemModel[]

    constructor(data){
        this.id = data.id ? data.id : null
        this.name = data.name ? data.name : null
        this.folderId = data.folderId ? data.folderId : null
        this.ownerId = data.ownerId ? data.ownerId : ""
        this.content = data.content ? data.content : []
    }

    getName(): string {
        return this.name
    }
        
    getSearchValues(): string[] {
        return [this.name]
    }
}