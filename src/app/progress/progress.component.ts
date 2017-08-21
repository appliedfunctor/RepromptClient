
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

    view: any[] = [400]

    // options
    showXAxis = true
    showYAxis = true
    gradient = false
    showLegend = false
    showGridLines = true
    showXAxisLabel = true
    xAxisLabel = 'Date'
    showYAxisLabel = true
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
        //Object.assign(this, {single, multi})   
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

    onSelect(event) {
        console.log(event)
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


        // this.multi = [
        // {
        //     "name": "SDP",
        //     "series": [
        //     {
        //         "name": new Date("2017-05-02"),
        //         "value": 51
        //     },
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 66
        //     },
        //     {
        //         "name": new Date("2017-05-05"),
        //         "value": 74
        //     },
        //     {
        //         "name": new Date("2017-05-08"),
        //         "value": 92
        //     }
        //     ]
        // },

        // {
        //     "name": "IS",
        //     "series": [
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 48
        //     },
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 51
        //     },
        //     {
        //         "name": new Date("2017-05-04"),
        //         "value": 77
        //     },
        //     {
        //         "name": new Date("2017-05-06"),
        //         "value": 89
        //     },
        //     {
        //         "name": new Date("2017-05-09"),
        //         "value": 100
        //     }
        //     ]
        // },

        // {
        //     "name": "CS",
        //     "series": [
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 24
        //     },
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 36
        //     },
        //     {
        //         "name": new Date("2017-05-04"),
        //         "value": 88
        //     },
        //     {
        //         "name": new Date("2017-05-06"),
        //         "value": 60
        //     },
        //     {
        //         "name": new Date("2017-05-09"),
        //         "value": 72
        //     }
        //     ]
        // },

        // {
        //     "name": "FOC",
        //     "series": [
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 40
        //     },
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 45
        //     },
        //     {
        //         "name": new Date("2017-05-04"),
        //         "value": 50
        //     },
        //     {
        //         "name": new Date("2017-05-06"),
        //         "value": 58
        //     },
        //     {
        //         "name": new Date("2017-05-09"),
        //         "value": 54
        //     }
        //     ]
        // },

        // {
        //     "name": "PIJ",
        //     "series": [
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 60
        //     },
        //     {
        //         "name": new Date("2017-05-03"),
        //         "value": 72
        //     },
        //     {
        //         "name": new Date("2017-05-04"),
        //         "value": 54
        //     },
        //     {
        //         "name": new Date("2017-05-06"),
        //         "value": 80
        //     },
        //     {
        //         "name": new Date("2017-05-09"),
        //         "value": 78
        //     }
        //     ]
        // }
        // ]
    }
}