
import { Component } from "@angular/core"
import * as shape from 'd3-shape'
import { StudyService } from "app/_services/study.service";
import { Observable } from "rxjs/Rx";
import { NotificationsService } from "angular2-notifications";

@Component({
    selector: "progress-component",
    templateUrl: "progress.component.html",
    providers: [StudyService],
})
export class ProgressComponent {
    active: boolean = true
    loading: boolean = false
    single: any[] = []
    multi: any[] = []

    
    windowWidth: number
    windowHeight: number

    view: any[] = [370, 400]

    // options
    showXAxis = true
    showYAxis = true
    gradient = false
    showLegend = false
    showGridLines = true
    showXAxisLabel = true
    xAxisLabel = 'Date'
    showYAxisLabel = false
    yAxisLabel = 'Assessment %'

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#393E41', '#D3D0CB', '#E2C044', '#587B7F', '#1E2019', '#6369D1',
                 '#60E1E0', '#D8D2E1', '#B88E8D', '#495F41', '#48284A', '#FFE1C6', '#B4C5E4', '#0D5D56', '#3D52D5', '#8FD5A6',
                ]
    };

    curve = shape.curveBasis

    // line, area
    autoScale = false

    constructor(private service: StudyService, private notify: NotificationsService) {
        this.windowWidth = window.screen.height
        this.windowHeight = window.screen.width
    }

    toggleSmoothing() {
        if(this.curve == shape.curveBasis) {
            this.curve = shape.curveLinear
        } else {
            this.curve = shape.curveBasis
        }
    }

    ngOnInit() {
        this.loadData()
    }

    loadData() {
        this.loading = true
        this.service.getHistoricalAssessmentDataByExam()
        .takeWhile( () => this.active )
        .catch( err => {
            this.notify.error("error", err)
            return Observable.of(null)
        })
        .subscribe( res => {
            if(res) {
                this.multi = res
            }
            this.loading = false
        })


    }
}