
import { Component } from "@angular/core"
import * as shape from 'd3-shape'

@Component({
    selector: "progress-component",
    templateUrl: "progress.component.html"
})
export class ProgressComponent {
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
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    curve = shape.curveBasis

    // line, area
    autoScale = false

    constructor() {
        //Object.assign(this, {single, multi})   
    }

    ngOnInit() {
        this.loadData()
    }

    onSelect(event) {
        console.log(event)
    }

    loadData() {
        this.multi = [
        {
            "name": "SDP",
            "series": [
            {
                "name": new Date("2017-05-02"),
                "value": 51
            },
            {
                "name": new Date("2017-05-03"),
                "value": 66
            },
            {
                "name": new Date("2017-05-05"),
                "value": 74
            },
            {
                "name": new Date("2017-05-08"),
                "value": 92
            }
            ]
        },

        {
            "name": "IS",
            "series": [
            {
                "name": new Date("2017-05-03"),
                "value": 48
            },
            {
                "name": new Date("2017-05-03"),
                "value": 51
            },
            {
                "name": new Date("2017-05-04"),
                "value": 77
            },
            {
                "name": new Date("2017-05-06"),
                "value": 89
            },
            {
                "name": new Date("2017-05-09"),
                "value": 100
            }
            ]
        }
        ]
    }
}