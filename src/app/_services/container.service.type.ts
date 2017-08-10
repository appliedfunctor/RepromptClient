import { Observable } from "rxjs/Observable"
import { FileContainer } from "app/_models/file-container.model"
import { FileElement } from "app/_models/file-element.model"

export interface ContainerService {
    get(containerId: number): Observable<any>
    getAllContainers(): Observable<any>
    save(container: FileContainer)
    delete(containerId: number)
    attach(containerId: any, userId: any)
    detach(containerId: any, userId: any)
    getAllItems()
}