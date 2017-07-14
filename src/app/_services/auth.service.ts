/**
 * Following code influenced by http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 * Accessed 11/07/2016
 * 
 * Also Angular.io http guide: https://angular.io/guide/http
 * accessed 13/07/2017
 */
import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from "@angular/http"
import {Observable} from 'rxjs/Rx'
import { UserModel } from "../_models/user.model"
import { ErrorMessage } from "../_models/error.model"
import { Paths } from "../app.paths"

//import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    public jwtToken
    private user: UserModel
    private registerPath = "/api/auth/register"
    private loginPath = "/api/auth/login"
    private path = new Paths
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        //load existing JWT token from storage
        var loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        this.jwtToken = loginInfo && loginInfo.token
        this.user = loginInfo && loginInfo.user
    }

    register(user: UserModel): Observable<any> {        
        let options = new RequestOptions({ headers: this.headers });
        let sendData = JSON.stringify(user);

        //send request to endpoint
        return this.http.put(this.path.getUrl(this.registerPath), sendData, options)
                    .map(this.handleData)
                    .catch(this.handleError);
    }

    login(email: String, password: String): Observable<any> {

        // if (this.isAuthenticated()) {
        //     return new Observable(JSON.parse(localStorage.getItem('loginInfo')))
        // }
        console.log(this.path.getUrl(this.loginPath))
		let options = new RequestOptions({ headers: this.headers });
        let sendData = JSON.stringify({email: email, password: password });
        
        //send request to endpoint
        return this.http.post(this.path.getUrl(this.loginPath), sendData, options)
                    .map(this.handleData)
                    .catch(this.handleError);
        
    }

    logout(): void {
        this.jwtToken = null
        this.user = null
        localStorage.removeItem('loginInfo')
    }

    isAuthenticated(): boolean {
        return this.jwtToken ? true : false   
    }

    getCurrentUser(): UserModel {
        if ( this.isAuthenticated() ) {
            return this.user
        } else {
            let noUser = new UserModel({
                firstName: "Guest",
                lastName: "",
                avatarUrl: "assets/blankProfile.png"
            })
        }
    }

    private handleData(res: Response) {        
        let jwtToken = res && res.headers && res.headers.get('X-Auth-Token')
        let body = res.json()

        if(jwtToken && jwtToken != "") {
            this.jwtToken = jwtToken
            let userParsed = new UserModel(body)
            this.user = userParsed
            localStorage.setItem('loginInfo', JSON.stringify({   
                user: userParsed,
                token: jwtToken
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

  
}