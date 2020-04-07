import { Injectable } from '@angular/core'
import { Response, RequestOptions, Headers } from '@angular/http'
import { AuthHttp } from 'angular2-jwt/angular2-jwt'
import { Paths } from 'app/app.paths'
import { ContentPackageModel } from 'app/_models/content-package.model'
import { Observable } from 'rxjs/Rx'
import { CohortModel } from 'app/_models/cohort.model'
import { ExamModel } from 'app/_models/exam.model'
import { CommonLibsService } from 'app/_services/common.libs.service'

@Injectable()
export class PublishService {

    private path = new Paths;
    cohortGetPath = '/api/cohorts/owned';
    packageGetPath = '/api/content/packages/owned';
    publishGetPath = '/api/published/exam/';
    publishGetAllPath = '/api/published/exams/owned';
    publishCohortAttachPath = '/api/published/cohort/';
    publishPackageAttachPath = '/api/published/package/';

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
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleCohorts)
                            .catch(CommonLibsService.handleError)
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
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handlePackages)
                            .catch(CommonLibsService.handleError)
    }

    delete(examId: number): Observable<number> {
        return this.authHttp.delete(this.path.getUrl(this.publishGetPath) + examId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    get(examId: number): Observable<ExamModel> {
        return this.authHttp.get(this.path.getUrl(this.publishGetPath) + examId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => new ExamModel(res.json()))
                            .catch(CommonLibsService.handleError)
    }

    getAll(): Observable<ExamModel[]> {
        return this.authHttp.get(this.path.getUrl(this.publishGetAllPath))
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleExams)
                            .catch(CommonLibsService.handleError)
    }

    save(exam: ExamModel): Observable<ExamModel> {
        return this.authHttp.post(this.path.getUrl(this.publishGetPath), exam)
                            .timeout(CommonLibsService.timeout)
                            .map(res => new ExamModel(res.json()))
                            .catch(CommonLibsService.handleError)
    }

    attachCohort(cohortId: number, assignedId: number) {
        return this.authHttp.post(this.path.getUrl(this.publishCohortAttachPath), {cohortId: cohortId, assignedId: assignedId})
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    detachCohort(cohortId: number, assignedId: number) {
        return this.authHttp.delete(this.path.getUrl(this.publishCohortAttachPath) +  cohortId + '/' + assignedId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    attachPackage(packageId: number, assignedId: number) {
        return this.authHttp.post(this.path.getUrl(this.publishPackageAttachPath), {packageId: packageId, assignedId: assignedId})
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    detachPackage(packageId: number, assignedId: number) {
        return this.authHttp.delete(this.path.getUrl(this.publishPackageAttachPath)  + packageId + '/' + assignedId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

}
