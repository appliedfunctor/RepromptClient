import { Observable } from "rxjs/Observable";
import { FileContainer } from "app/_models/file-container.type";
import { FileElement } from "app/_models/file-element.type";

export interface ContainerService {
    get(containerId: number): Observable<any>
    getAllContainers(): Observable<any>
    save(container: FileContainer)
    delete(containerId: number)
    attach(containerId: any, userId: any)
    detach(containerId: any, userId: any)
    getAllItems()
}