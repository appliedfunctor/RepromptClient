import { Injectable } from "@angular/core"
import { Response, RequestOptions, Headers } from "@angular/http"
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { Paths } from "app/app.paths";
import { ContentPackageModel } from "app/_models/content-package.model";
import { Observable } from "rxjs/Rx";
import { CohortModel } from "app/_models/cohort.model";

@Injectable()
export class PublishService {

    private path = new Paths
    cohortGetPath = '/api/cohorts/owned'
    packageGetPath = '/api/content/packages/owned'

    constructor(private authHttp: AuthHttp) {
    }

    /**
     * Get a specific content package by Id
     * 
     * @param {number} contentId 
     * @returns {Observable<any>} 
     * @memberof ContentPackageService
     */
    getAllCohorts(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.cohortGetPath))
                            .map(this.handleCohorts)
                            .catch(this.handleError)
    }

    /**
     * Get a specific content package by Id
     * 
     * @param {number} contentId 
     * @returns {Observable<any>} 
     * @memberof ContentPackageService
     */
    getAllPackages(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.packageGetPath))
                            .map(this.handlePackages)
                            .catch(this.handleError)
    }

    private handleCohorts(res: Response) {   
        let cohorts: CohortModel[] = []
        res.json().forEach(data => cohorts.push(new CohortModel(data)))
        return cohorts
    }

    private handlePackages(res: Response) {   
        let packages: ContentPackageModel[] = []
        res.json().forEach(data => packages.push(new ContentPackageModel(data)))
        return packages
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