import { Observable } from "rxjs/Observable";
import { FileContainer } from "app/_models/fileContainer.type";

export interface ContainerService {
    get(containerId: number): Observable<any>
    getAllContainers(): Observable<any>
    save(container: FileContainer)
    delete(cohortId: number)
    attach(cohortId: any, userId: any)
    detach(cohortId: any, userId: any)
    getAllItems()    
}