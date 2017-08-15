import { Component } from "@angular/core"
import { StudyService } from "app/_services/study.service"
import { ContentItemModel } from "app/_models/content-item.model"
import { QuestionModel } from "app/_models/question.model"
import { Observable } from "rxjs/Rx"
import { NotificationsService } from "angular2-notifications"
import { Settings } from "app/libs/Settings";
import { AnswerModel } from "app/_models/answer.model";
import { ScoreModel } from "app/_models/score.model";
import { Arrays } from "app/libs/Arrays";

@Component({
    selector: 'study',
    templateUrl: 'study.component.html',
    providers: [StudyService]
})
export class StudyComponent {
    loading: boolean = false
    active: boolean = true
    pendingContent: ContentItemModel[]
    currentContent: ContentItemModel = null
    pendingQuestions: QuestionModel[] = []
    currentQuestion: QuestionModel = null
    currentScoring: number[] = []
    options = Settings.toastOptions
    contentAggregateScore: number

    constructor(private service: StudyService, private notify: NotificationsService) { }

    ngOnInit() {
        this.loading = true
        this.service.getContentItems()
            .takeWhile(() => this.active)
            .catch( (errMsg) => {
                this.notify.error('Error', errMsg)     
                return Observable.of(null)
            })
            .subscribe( res => {
                if(res) {
                    this.pendingContent = res
                    this.nextContent()
                }
                this.loading = false
            })
    }

    ngOnDestory() {
        this.active = false
    }

    test(item: ContentItemModel) {
        this.pendingQuestions = Arrays.shuffleInPlace(this.currentContent.questions)
        this.pendingQuestions.forEach(q => q.answers = Arrays.shuffleInPlace(q.answers))
        this.nextQuestion()
    }

    marked(score: number) {        
        this.currentScoring.push(score)
        console.log('Score is ' + score)
        this.nextQuestion()
        this.debugQs()
    }

    nextQuestion() {
        if(this.pendingQuestions.length > 0) {
            this.currentQuestion = this.pendingQuestions.pop()
        } else {
            this.currentQuestion = null
            let score = this.executeContentItemMarking()
            this.persistScoreData(score)
            this.nextContent()
        }
    }

    persistScoreData(score: number) {
        let date = new Date().toISOString().slice(0, 10)
        let scoreData = this.currentContent ? new ScoreModel(this.currentContent.score) : new ScoreModel({contentItemId: this.currentContent.id})                        
        scoreData.score = score
        scoreData.scoreDate = date
        if(!scoreData.streak) scoreData.streak = 0

        console.log('ScoreData: ' + JSON.stringify(scoreData))
        this.service.saveScoreData(scoreData)
            .takeWhile( () => this.active)
            .catch( errMsg => {
                this.notify.error('Error', errMsg)
                return Observable.of(null)
            })
            .subscribe( res => {
                if(res) {
                    this.notify.alert('Notice', 'Score Saved')
                }
            })
    }

    nextContent() {
        if(this.pendingContent.length > 0) { this.currentContent = this.pendingContent.pop() }
        else { this.currentContent = null }
    }

    executeContentItemMarking(): number {
        if(this.currentScoring.length < 1) {
            this.contentAggregateScore = 0
        } else {
            this.contentAggregateScore = Math.round((this.currentScoring.reduce( (acc, score) => acc + score ) / this.currentScoring.length * 100) * 1E0) / 1E0
            console.log('Aggregate Score: ' + this.contentAggregateScore)
        }
        return this.contentAggregateScore
    }

    debugQs() {
        if (!this.currentQuestion) { console.log('Current Question: null') }
        else { console.log('Current Question: ' + this.currentQuestion.question) }
        console.log('Pending Questions')
        this.pendingQuestions.forEach(q => console.log(q.question))
    }
}