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

@Injectable()
export class ContentService implements ContainerService{    
    private path = new Paths
    private contentGetPath = '/api/content/'
    private contentGetAllPath = '/api/content/owned'
    private contentSavePath = '/api/content/save'
    private contentDeletePath = '/api/content/'
    private contentMemberPath = '/api/content/item'

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
        return this.authHttp.get(this.path.getUrl(this.contentGetPath) + contentId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    /**
     * Get all content folders owned by the current user
     * 
     * @returns {Observable<any>} 
     * @memberof ContentService
     */
    getAll(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.contentGetAllPath))
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
    save(cohort: FileContainer) {
        // return this.authHttp.post(this.path.getUrl(this.cohortSavePath), cohort)
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
    }

    /**
     * delete a content folder by id
     * 
     * @param {number} cohortId 
     * @returns 
     * @memberof ContentService
     */
    delete(cohortId: number) {
        // return this.authHttp.delete(this.path.getUrl(this.cohortDeletePath) + cohortId)
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
    }

    /**
     * link a cohort to a content folder
     * 
     * @param {number} cohortId 
     * @param {number} userId 
     * @returns 
     * @memberof ContentService
     */
    attach(contentId: number, cohortId: number) {
        // let data = new CohortMemberModel({cohortId: cohortId, userId: userId})
        // return this.authHttp.post(this.path.getUrl(this.cohortMemberPath), data)
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
    }

    /**
     * unlink a cohort from a content folder
     * 
     * @param {number} cohortId 
     * @param {number} userId 
     * @returns 
     * @memberof ContentService
     */
    detach(cohortId: number, userId: number) {
        // return this.authHttp.delete(this.path.getUrl(this.cohortMemberPath) + '/' + cohortId + '/' + userId)
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
    }

    /**
     * get all content items
     * 
     * @returns 
     * @memberof ContentService
     */
    getAllItems() {
        // return this.authHttp.get(this.path.getUrl(this.userGetPath))
        //                     .map(res => res.json())
        //                     .catch(this.handleError)
    }

    private handleContainers(res: Response) {   
        //parse response data into Cohorts
        // let cohorts: CohortModel[] = []
        // res.json().forEach(data => cohorts.push(new CohortModel(data)))
        // return cohorts;
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