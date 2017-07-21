import { Injectable } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { Paths } from "../app.paths"
import { AuthHttp } from 'angular2-jwt';
import { CohortModel } from "../_models/cohort.model"
import { CohortMemberModel } from "app/_models/cohortMember.model";

@Injectable()
export class CohortService {    
    private path = new Paths
    private cohortGetPath = '/api/cohort/'
    private cohortGetAllPath = '/api/cohorts/owned'
    private cohortSavePath = '/api/cohort/save'
    private cohortDeletePath = '/api/cohort/'
    private cohortMemberPath = '/api/cohort/member'
    private userGetPath = '/api/user'

    constructor(private authHttp: AuthHttp) {
    }

    get(cohortId: number): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.cohortGetPath) + cohortId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    getAll(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.cohortGetAllPath))
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    save(cohort: CohortModel) {
        return this.authHttp.post(this.path.getUrl(this.cohortSavePath), cohort)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    delete(cohortId: number) {
        return this.authHttp.delete(this.path.getUrl(this.cohortDeletePath) + cohortId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    attach(cohortId: number, userId: number) {
        let data = new CohortMemberModel({cohortId: cohortId, userId: userId})
        return this.authHttp.post(this.path.getUrl(this.cohortMemberPath), data)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    detach(cohortId: number, userId: number) {
        return this.authHttp.delete(this.path.getUrl(this.cohortMemberPath) + '/' + cohortId + '/' + userId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    getAllUsers() {
        return this.authHttp.get(this.path.getUrl(this.userGetPath))
                            .map(res => res.json())
                            .catch(this.handleError)
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