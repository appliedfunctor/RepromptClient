import { Injectable } from "@angular/core"
import { Response, RequestOptions, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { Paths } from "../app.paths"
import { AuthHttp } from 'angular2-jwt'
import { CohortMemberModel } from "app/_models/cohort-member.model"
import { FileContainer } from "app/_models/file-container.model"
import { ContainerService } from "app/_services/container.service.type"
import { CohortModel } from "app/_models/cohort.model"
import { UserModel } from "app/_models/user.model"
import { CommonLibsService } from "app/_services/common.libs.service"

@Injectable()
export class CohortService implements ContainerService{    
    private path = new Paths
    private cohortGetPath = '/api/cohort/'
    private cohortGetAllContainersPath = '/api/cohorts/owned'
    private cohortSavePath = '/api/cohort/'
    private cohortDeletePath = '/api/cohort/'
    private cohortMemberPath = '/api/cohort/member/'
    private userGetPath = '/api/users/'

    constructor(private authHttp: AuthHttp) {
    }

    get(cohortId: number): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.cohortGetPath) + cohortId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    getAllContainers(): Observable<any> {
        return this.authHttp.get(this.path.getUrl(this.cohortGetAllContainersPath))
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleContainers)
                            .catch(CommonLibsService.handleError)
    }

    save(cohort: FileContainer) {
        return this.authHttp.post(this.path.getUrl(this.cohortSavePath), cohort)
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleContainer)
                            .catch(CommonLibsService.handleError)
    }

    delete(cohortId: number) {
        return this.authHttp.delete(this.path.getUrl(this.cohortDeletePath) + cohortId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    attach(cohortId: number, userId: number) {
        let data = new CohortMemberModel({cohortId: cohortId, userId: userId})
        return this.authHttp.post(this.path.getUrl(this.cohortMemberPath), data)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    detach(cohortId: number, userId: number) {
        return this.authHttp.delete(this.path.getUrl(this.cohortMemberPath) + cohortId + '/' + userId)
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    }

    getAllItems() {
        return this.authHttp.get(this.path.getUrl(this.userGetPath))
                            .timeout(CommonLibsService.timeout)
                            .map(res => res.json())
                            .catch(CommonLibsService.handleError)
    } 
}