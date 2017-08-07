import { Injectable } from "@angular/core";
import { Paths } from "app/app.paths";

@Injectable()
export class StudyService {

    private path = new Paths
    studyGetPath = '/api/study/'

    getContentItems() {
        
    }

}