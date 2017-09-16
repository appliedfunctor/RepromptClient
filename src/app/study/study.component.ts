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
                    Arrays.shuffleInPlace(this.pendingContent)
                    this.nextContent()
                }
                this.loading = false
            })
    }

    ngOnDestroy() {
        this.active = false
    }

    test() {
        this.pendingQuestions = Arrays.shuffleInPlace(this.currentContent.questions.slice())
        this.pendingQuestions.forEach(q => q.answers = Arrays.shuffleInPlace(q.answers))
        this.nextQuestion()
    }

    marked(score: number) {        
        this.currentScoring.push(score)
        //console.log('Score is ' + score)
        this.nextQuestion()
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

    rescheduleContent(content: ContentItemModel) {
        if(content != null) {
            this.pendingContent.push(content)
            Arrays.shuffleInPlace(this.pendingContent)
        }
    }

    persistScoreData(score: number) {
        let date = new Date().toISOString().slice(0, 10)
        this.currentContent.score = this.currentContent ? new ScoreModel(this.currentContent.score) : new ScoreModel({contentItemId: this.currentContent.id})                        
        this.currentContent.score.score = score
        this.currentContent.score.scoreDate = date
        if(!this.currentContent.score.streak) { this.currentContent.score.streak = 0 }
        if(score < 50) { this.rescheduleContent(this.currentContent) }
        
        this.service.saveScoreData(this.currentContent.score)
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
        //handle available pending content
        if(this.pendingContent.length > 0) { this.currentContent = this.pendingContent.pop() }
        else { this.currentContent = null }
        this.handleExamMode()
    }

    handleExamMode() {
        if(this.currentContent && this.currentContent.score.streak > 3) {
            this.test()
        }
    }

    executeContentItemMarking(): number {
        let contentAggregateScore = 0
        if(this.currentScoring.length > 0) {
            contentAggregateScore = Math.round((this.currentScoring.reduce( (acc, score) => acc + score ) / this.currentScoring.length * 100) * 1E0) / 1E0
        }
        this.currentScoring = []
        return contentAggregateScore
    }
}