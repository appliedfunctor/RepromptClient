import { Injectable } from "@angular/core"
import { Paths } from "app/app.paths"
import { CommonLibsService } from "app/_services/common.libs.service";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ContentItemModel } from "app/_models/content-item.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class StudyService {
    private path = new Paths
    studyGetPath = '/api/study/'

    constructor(private authHttp: AuthHttp) { }

    getContentItems(): Observable<ContentItemModel[]> {
        return this.authHttp.get(this.path.getUrl(this.studyGetPath))
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleItems)
                            .catch(CommonLibsService.handleError)
    }

}