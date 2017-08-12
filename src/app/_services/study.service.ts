import { Injectable } from "@angular/core"
import { Paths } from "app/app.paths"
import { CommonLibsService } from "app/_services/common.libs.service";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ContentItemModel } from "app/_models/content-item.model";
import { Observable } from "rxjs/Rx";
import { ScoreModel } from "app/_models/score.model";

@Injectable()
export class StudyService {
    private path = new Paths
    studyAllPath = '/api/studies/'
    studyPath = '/api/study/score/'

    constructor(private authHttp: AuthHttp) { }

    getContentItems(): Observable<ContentItemModel[]> {
        return this.authHttp.get(this.path.getUrl(this.studyAllPath))
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleItems)
                            .catch(CommonLibsService.handleError)
    }

    saveScoreData(scoreData: ScoreModel): Observable<any> {
        return this.authHttp.post(this.path.getUrl(this.studyPath), scoreData)
                            .timeout(CommonLibsService.timeout)
                            .map(CommonLibsService.handleQuestion)
                            .catch(CommonLibsService.handleError)
    }

}