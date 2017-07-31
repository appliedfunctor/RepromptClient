/**
 * Following code influenced by http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 * Accessed 11/07/2016
 * 
 * Also Angular.io http guide: https://angular.io/guide/http
 * accessed 13/07/2017
 */
import { Injectable, Output, EventEmitter } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from "@angular/http"
import { Observable } from 'rxjs/Rx'
import { UserModel } from "../_models/user.model"
import { ErrorMessage } from "../_models/error.model"
import { Paths } from "../app.paths"
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

//import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    public jwtToken: string
    private user: UserModel = new UserModel({})
    private registerPath = "/api/auth/register"
    private loginPath = "/api/auth/login"
    private path = new Paths
    private headers = new Headers({ 'Content-Type': 'application/json' })
    @Output() userChange = new EventEmitter<UserModel>()
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) {
        this.loadDataFromStorage()
    }

    ngOnInit() {
        
    }

    startAuthChecks() {          
        let subscription = Observable.interval(30000)
            .subscribe((count) => {
              if(!this.isAuthenticated()) {
                subscription.unsubscribe()
                this.logout()
              }            
          })
    }

    loadDataFromStorage() {
        //load existing JWT token from storage
        var loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        this.jwtToken = loginInfo && loginInfo.token
        //load existing user from storage
        if(loginInfo != null && loginInfo.user != null){
            this.user = new UserModel(loginInfo.user)
        }
        if(this.isAuthenticated()) {
            this.startAuthChecks()
        }
        //this.onUserChange()
    }

    register(user: UserModel): Observable<any> {        
        let options = new RequestOptions({ headers: this.headers });
        let sendData = JSON.stringify(user);

        //send request to endpoint
        let response = this.http.post(this.path.getUrl(this.registerPath), sendData, options)
                        .map(this.handleData)
                        .catch(this.handleError)
                        .share()

        response.subscribe(res => {

            //handle token
            this.loadDataFromStorage()

            //handle user
            if(res.hasOwnProperty("id")) {
                this.user = new UserModel(res)
                this.onUserChange()
            }
        })
        
        return response
    }

    login(email: String, password: String): Observable<any> {
        //console.log(this.path.getUrl(this.loginPath))
		let options = new RequestOptions({ headers: this.headers });
        let sendData = JSON.stringify({email: email, password: password });
        
        //send request to endpoint
        let response = this.http.post(this.path.getUrl(this.loginPath), sendData, options)
                        .map(this.handleData)
                        .catch(this.handleError)
                        .share()

        response.share().subscribe(res => {

            //handle token
            this.loadDataFromStorage()

            //handle user
            if(res.hasOwnProperty("id")) {
                this.user = new UserModel(res)
                this.onUserChange()

                this.startAuthChecks()
            }
        })
        
        return response.share()
    }

    logout(): void {
        this.jwtToken = null
        this.user = new UserModel({})
        localStorage.removeItem('loginInfo')
        this.onUserChange()
    }

    isAuthenticated(): boolean {
        //console.log("token valid: " + (this.isTokenValid()))
        return this.isTokenValid() ? true : false   
    }

    getToken() {
        let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        let jwtToken = loginInfo && loginInfo.token
        return jwtToken
    }

    isTokenValid() {
        //console.log("token null: " + (this.jwtToken == null))
        if(this.jwtToken != null) {
        //console.log("token expired: " + this.jwtHelper.isTokenExpired(this.jwtToken))
        }
        return (this.jwtToken != null && !this.jwtHelper.isTokenExpired(this.jwtToken))
    }

    getCurrentUser(): UserModel {
        return this.user
    }

    private handleData(res: Response) {   
        let token = res && res.headers && res.headers.get('X-Auth-Token')
        let body = res.json()

        if(token && token != "") {
            let userParsed = new UserModel(body)
            localStorage.setItem('loginInfo', JSON.stringify({   
                user: userParsed,
                token: token
            }))
        }

        return body;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    onUserChange() {
        this.userChange.emit(this.user)
    }

  
}