import { CommonLibsService } from "app/_services/common.libs.service";
import { CohortModel } from "app/_models/cohort.model";
import { Response, ResponseOptions, Headers } from "@angular/http"
import { ContentFolderModel } from "app/_models/content-folder.model";
import { ContentPackageModel } from "app/_models/content-package.model";
import { ExamModel } from "app/_models/exam.model";
import { ExamHistoryModel } from "app/_models/exam-history.model";
import { ContentItemModel } from "app/_models/content-item.model";
import { QuestionModel } from "app/_models/question.model";

describe('CommonLibsService', () => {

    let component: CommonLibsService

    let cohortData = new Response(new ResponseOptions({
        body: JSON.stringify([new CohortModel({id: 2}), new CohortModel({id: 3})])
    }))
    let containerData = new Response(new ResponseOptions({
        body: JSON.stringify(new ContentFolderModel({id: 2}))
    }))
    let containerDatas = new Response(new ResponseOptions({
        body: JSON.stringify([new ContentFolderModel({id: 2})])
    }))
    let packageData = new Response(new ResponseOptions({
        body: JSON.stringify(new ContentPackageModel({id: 2}))
    }))
    let packageDatas = new Response(new ResponseOptions({
        body: JSON.stringify([new ContentPackageModel({id: 2}),new ContentPackageModel({id: 4}),new ContentPackageModel({id: 5})])
    }))
    let examData = new Response(new ResponseOptions({
        body: JSON.stringify([new ExamModel({id: 2}),new ExamModel({id: 4}),new ExamModel({id: 5})])
    }))
    let examHistoryData = new Response(new ResponseOptions({
        body: JSON.stringify([new ExamHistoryModel({id: 2, series: [{}]}), new ExamHistoryModel({id: 4, series: [{}]})])
    }))
    let itemData = new Response(new ResponseOptions({
        body: JSON.stringify(new ContentItemModel({id: 9}))
    }))
    let itemDatas = new Response(new ResponseOptions({
        body: JSON.stringify([new ContentItemModel({id: 2}), new ContentItemModel({id: 4})])
    }))
    let questionData = new Response(new ResponseOptions({
        body: JSON.stringify(new QuestionModel({id: 64}))
    }))
    
    beforeEach( () => {
        component = new CommonLibsService()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should handleCohorts', () => {
        expect(CommonLibsService.handleCohorts(cohortData).length).toBe(2)
    })

    it('should handleContainer', () => {
        expect(CommonLibsService.handleContainer(containerData).id).toBe(2)
    })

    it('should handleContainers', () => {
        expect(CommonLibsService.handleContainers(containerDatas).length).toBe(1)
    })

    it('should handlePackage', () => {
        expect(CommonLibsService.handlePackage(packageData).id).toBe(2)
    })

    it('should handlePackages', () => {
        expect(CommonLibsService.handlePackages(packageDatas).length).toBe(3)
    })

    it('should handleExams', () => {
        expect(CommonLibsService.handleExams(examData).length).toBe(3)
    })

    it('should handleExamHistories', () => {
        expect(CommonLibsService.handleExamHistories(examHistoryData).length).toBe(2)
    })

    it('should handleItem', () => {
        expect(CommonLibsService.handleItem(itemData).id).toBe(9)
    })

    it('should handleItems', () => {
        expect(CommonLibsService.handleItems(itemDatas).length).toBe(2)
    })

    it('should handleQuestion', () => {
        expect(CommonLibsService.handleQuestion(questionData).id).toBe(64)
    })
    
    it('should handleError', () => {
        expect(CommonLibsService.handleError(questionData)).toBeTruthy()
    })
})