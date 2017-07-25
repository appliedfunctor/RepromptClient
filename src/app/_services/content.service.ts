import { Injectable } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { Paths } from "../app.paths"
import { AuthHttp } from 'angular2-jwt';
import { CohortMemberModel } from "app/_models/cohortMember.model";
import { FileContainer } from "app/_models/fileContainer.type";
import { ContainerService } from "app/_services/container.service.type";
import { CohortModel } from "app/_models/cohort.model";
import { UserModel } from "app/_models/user.model";
import { ContentFolderModel } from "app/_models/contentFolder.model";
import { PackageModel } from "app/_models/package.model";

@Injectable()
export class ContentService implements ContainerService{    
    private path = new Paths
    private folderGetPath = '/api/content/folder/'
    private folderGetAllPath = '/api/content/folders/owned'
    private folderSavePath = '/api/content/folder'
    private packageSavePath = '/api/content/package/'
    private folderDeletePath = '/api/content/folder/'
    private packageDeletePath = '/api/content/package/'
    private contentPackagePath = '/api/content/package'

    constructor(private authHttp: AuthHttp) {
    }

    /**
     * Get a specific content folder by Id
     * 
     * @param {number} contentId 
     * @returns {Observable<any>} 
     * @memberof ContentService
     */
    get(contentId: number): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.folderGetPath) + contentId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    /**
     * Get all content folders owned by the current user
     * 
     * @returns {Observable<any>} 
     * @memberof ContentService
     */
    getAllContainers(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.folderGetAllPath))
                            .map(this.handleContainers)
                            .catch(this.handleError)
    }

    /**
     * save a content folder
     * 
     * @param {FileContainer} cohort 
     * @returns 
     * @memberof ContentService
     */
    save(container: FileContainer) {
        return this.authHttp.post(this.path.getUrl(this.folderSavePath), container)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    /**
     * delete a content folder by id
     * 
     * @param {number} cohortId 
     * @returns 
     * @memberof ContentService
     */
    delete(folderId: number) {
        return this.authHttp.delete(this.path.getUrl(this.folderDeletePath) + folderId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    /**
     * link a cohort to a content folder
     * 
     * @param {number} cohortId 
     * @param {number} userId 
     * @returns 
     * @memberof ContentService
     */
    attach(packageModel: PackageModel) {
        return this.authHttp.post(this.path.getUrl(this.packageSavePath), packageModel)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    /**
     * unlink a cohort from a content folder
     * 
     * @param {number} cohortId 
     * @param {number} userId 
     * @returns 
     * @memberof ContentService
     */
    detach(packageModel: PackageModel) {
        return this.authHttp.delete(this.path.getUrl(this.packageDeletePath) + '/' + packageModel.id)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    /**
     * get all content items
     * 
     * @returns 
     * @memberof ContentService
     */
    getAllItems() {
        // return this.authHttp.get(this.path.getUrl(this.contentPackagePath))
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
        return Observable.of('')
    }

    private handleContainers(res: Response) {   
        //parse response data into Folders
        let folders: ContentFolderModel[] = []
        res.json().forEach(data => folders.push(new ContentFolderModel(data)))
        return folders;
    }

    private handleElements(res: Response) {   
        //parse response data into Elements
        // let users: UserModel[] = []
        // res.json().forEach(data => users.push(new UserModel(data)))
        // return users;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

}