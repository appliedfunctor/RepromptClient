import { Observable } from "rxjs/Rx"
import { Response } from "@angular/http"
import { CohortModel } from "app/_models/cohort.model"
import { ContentPackageModel } from "app/_models/content-package.model"
import { ExamModel } from "app/_models/exam.model"
import { ContentItemModel } from "app/_models/content-item.model"
import { QuestionModel } from "app/_models/question.model"
import { ContentFolderModel } from "app/_models/content-folder.model";

export class CommonLibsService {

    static timeout = 3000
    static authInterval = 30000

    static handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || ''
            const err = body.error || JSON.stringify(body)
            errMsg = err && err != '' ? err :  `${error.status} - ${error.statusText || ''} ${err}`

            if(error.status == 0) { errMsg = "The server is currently unavailable" }

        } else {
            errMsg = error.message ? error.message : error.toString()
        }
        return Observable.throw(errMsg)
    }

    static handleCohorts(res: Response): CohortModel[] {   
        let cohorts: CohortModel[] = []
        res.json().forEach(data => cohorts.push(new CohortModel(data)))
        return cohorts
    }

    static handleContainers(res: Response): ContentFolderModel[] {  
        let folders: ContentFolderModel[] = []
        res.json().forEach(data => folders.push(new ContentFolderModel(data)))
        return folders
    }

    static handlePackage(res: Response): ContentPackageModel {   
        //parse response data into Folders
        return new ContentPackageModel(res.json())
    }

    static handlePackages(res: Response): ContentPackageModel[] {   
        let packages: ContentPackageModel[] = []
        res.json().forEach(data => packages.push(new ContentPackageModel(data)))
        return packages
    }

    static handleExams(res: Response): ExamModel[] {
        let exams: ExamModel[] = []
        res.json().forEach(data => { exams.push(new ExamModel(data)) })
        return exams
    }

    static handleItem(res: Response): ContentItemModel {   
        let newItem = new ContentItemModel(res.json())
        return newItem
    }

    static handleItems(res: Response): ContentItemModel[] {   
        let items: ContentItemModel[] = []
        res.json().forEach(data => { items.push(new ContentItemModel(data)) })
        return items
    }

    static handleQuestion(res: Response): QuestionModel {
        return new QuestionModel(res.json())
    }
}