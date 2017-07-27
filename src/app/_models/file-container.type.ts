import { FileElement } from "app/_models/file-element.type";

export interface FileContainer {
    id?: number
    parentId: number
    ownerId: number
    name: string
    members: FileElement[]
}