import { Injectable } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { Paths } from "../app.paths"
import { AuthHttp } from 'angular2-jwt';
import { CohortMemberModel } from "app/_models/cohort-member.model";
import { FileContainer } from "app/_models/file-container.type";
import { ContainerService } from "app/_services/container.service.type";
import { CohortModel } from "app/_models/cohort.model";
import { UserModel } from "app/_models/user.model";
import { ContentFolderModel } from "app/_models/content-folder.model";
import { ContentPackageModel } from "app/_models/content-package.model";
import { ContentItemModel } from "app/_models/content-item.model";

@Injectable()
export class ContentPackageService {    
    private path = new Paths
    private packageGetPath = '/api/content/package/'
    private itemGetPath = '/api/content/item/'
    private itemGetAllPath = '/api/content/folders/owned'

    constructor(private authHttp: AuthHttp) {
    }

    /**
     * Get a specific content package by Id
     * 
     * @param {number} contentId 
     * @returns {Observable<any>} 
     * @memberof ContentService
     */
    get(packageId: number): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.packageGetPath) + packageId)
                            .map(this.handlePackage)
                            .catch(this.handleError)
    }



    // /**
    //  * Get all items for the current content package
    //  * 
    //  * @returns {Observable<any>} 
    //  * @memberof ContentService
    //  */
    // getAllItems(): Observable<any> {
    //     return this.authHttp.get(this.path.getUrl(this.folderGetAllPath))
    //                         .map(this.handleContainers)
    //                         .catch(this.handleError)
    // }

    /**
     * save a content package
     * 
     * @param {ContentItemModel} pkg 
     * @returns 
     * @memberof ContentItemModel
     */
    save(pkg: ContentItemModel) {
        return this.authHttp.post(this.path.getUrl(this.packageGetPath), pkg)
                            .map(this.handlePackage)
                            .catch(this.handleError)
    }

    /**
     * save a content package
     * 
     * @param {ContentItemModel} pkg 
     * @returns 
     * @memberof ContentItemModel
     */
    saveItem(item: ContentItemModel) {
        return this.authHttp.post(this.path.getUrl(this.itemGetPath), item)
                            .map(this.handleItem)
                            .catch(this.handleError)
    }

    /**
     * delete a content package by id
     * 
     * @param {number} cohortId 
     * @returns 
     * @memberof ContentService
     */
    delete(folderId: number) {
        // return this.authHttp.delete(this.path.getUrl(this.folderDeletePath) + folderId)
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
    }     

    private handlePackage(res: Response) {   
        //parse response data into Folders
        return new ContentPackageModel(res.json())
    }
    
    private handleItem(res: Response) {   
        //parse response data into Item
        let newItem = new ContentItemModel(res.json())
        console.log("Response: " + JSON.stringify(res.json()))
        return newItem
    }

    private handleItems(res: Response) {   
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