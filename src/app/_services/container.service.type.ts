import { Observable } from "rxjs/Observable";
import { FileContainer } from "app/_models/fileContainer.type";

export interface ContainerService {
    get(containerId: number): Observable<any>
    getAll(): Observable<any>
    save(container: FileContainer)
    delete(cohortId: number)
    attach(cohortId: number, userId: number)
    detach(cohortId: number, userId: number)
    getAllItems()    
}