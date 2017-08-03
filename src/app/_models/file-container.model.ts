import { FileElement } from "app/_models/file-element.model";

export abstract class FileContainer {
    id?: number
    parentId: number
    ownerId: number
    name: string
    members: FileElement[]

    static sortByName(a: FileContainer, b: FileContainer) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }
}