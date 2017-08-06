import { Injectable } from "@angular/core"
import { Response, RequestOptions, Headers } from "@angular/http"
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { Paths } from "app/app.paths";
import { ContentPackageModel } from "app/_models/content-package.model";
import { Observable } from "rxjs/Rx";
import { CohortModel } from "app/_models/cohort.model";
import { ExamModel } from "app/_models/exam.model";

@Injectable()
export class PublishService {

    private path = new Paths
    cohortGetPath = '/api/cohorts/owned'
    packageGetPath = '/api/content/packages/owned'
    publishGetPath = '/api/published/exam/'
    publishGetAllPath = '/api/published/exams/owned'
    publishCohortAttachPath = '/api/published/cohort/'
    publishPackageAttachPath = '/api/published/package/'

    constructor(private authHttp: AuthHttp) {
    }

    /**
     * Get a specific content package by Id
     * 
     * @param {number} contentId 
     * @returns {Observable<any>} 
     * @memberof ContentPackageService
     */
    getAllCohorts(): Observable<CohortModel[]> {
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
    getAllPackages(): Observable<ContentPackageModel[]> {
        return this.authHttp.get(this.path.getUrl(this.packageGetPath))
                            .map(this.handlePackages)
                            .catch(this.handleError)
    }

    delete(examId: number): Observable<number> {
        return this.authHttp.delete(this.path.getUrl(this.publishGetPath) + examId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    get(examId: number): Observable<ExamModel> {
        return this.authHttp.get(this.path.getUrl(this.publishGetPath) + examId)
                            .map(res => new ExamModel(res.json()))
                            .catch(this.handleError)
    }

    getAll(): Observable<ExamModel[]> {
        return this.authHttp.get(this.path.getUrl(this.publishGetAllPath))
                            .map(this.handleExams)
                            .catch(this.handleError)
    }

    save(exam: ExamModel): Observable<ExamModel> {
        return this.authHttp.post(this.path.getUrl(this.publishGetPath), exam)
                            .map(res => new ExamModel(res.json()))
                            .catch(this.handleError)
    }

    attachCohort(cohortId: number, assignedId: number) {
        return this.authHttp.post(this.path.getUrl(this.publishCohortAttachPath), {cohortId: cohortId, assignedId: assignedId})
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    detachCohort(cohortId: number, assignedId: number) {
        return this.authHttp.delete(this.path.getUrl(this.publishCohortAttachPath) +  cohortId + '/' + assignedId)
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    attachPackage(packageId: number, assignedId: number) {
        return this.authHttp.post(this.path.getUrl(this.publishGetPath), {packageId: packageId, assignedId: assignedId})
                            .map(res => res.json())
                            .catch(this.handleError)
    }

    detachPackage(packageId: number, assignedId: number) {
        return this.authHttp.delete(this.path.getUrl(this.publishGetPath)  + packageId + '/' + assignedId)
                            .map(res => res.json())
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

    private handleExams(res: Response) {   
        let exams: ExamModel[] = []
        res.json().forEach(data => {
            exams.push(new ExamModel(data))
        })
        return exams
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