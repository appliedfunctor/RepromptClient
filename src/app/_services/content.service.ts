import { Injectable } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { Paths } from "../app.paths"
import { AuthHttp } from 'angular2-jwt';
import { CohortMemberModel } from "app/_models/cohort-member.model";
import { FileContainer } from "app/_models/file-container.model";
import { ContainerService } from "app/_services/container.service.type";
import { CohortModel } from "app/_models/cohort.model";
import { UserModel } from "app/_models/user.model";
import { ContentFolderModel } from "app/_models/content-folder.model";
import { ContentPackageModel } from "app/_models/content-package.model";
import { CommonLibsService } from "app/_services/common.libs.service";

@Injectable()
export class ContentService implements ContainerService{  
    private path = new Paths
    private folderGetPath = '/api/content/folder/'
    private folderGetAllPath = '/api/content/folders/owned'
    private folderSavePath = '/api/content/folder/'
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
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    /**
     * Get all content folders owned by the current user
     * 
     * @returns {Observable<any>} 
     * @memberof ContentService
     */
    getAllContainers(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.folderGetAllPath))
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleContainers)
                            .catch(CommonLibsService.handleError)
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
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
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
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    /**
     * link a cohort to a content folder
     * 
     * @param {number} cohortId 
     * @param {number} userId 
     * @returns 
     * @memberof ContentService
     */
    attach(packageModel: ContentPackageModel) {
        return this.authHttp.post(this.path.getUrl(this.packageSavePath), packageModel)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    /**
     * unlink a cohort from a content folder
     * 
     * @param {number} cohortId 
     * @param {number} userId 
     * @returns 
     * @memberof ContentService
     */
    detach(folderId: number, packageId: number) {
        return this.authHttp.delete(this.path.getUrl(this.packageDeletePath) + packageId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
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
        //                     .catch(CommonLibsService.handleError)
        return Observable.of('')
    }

}