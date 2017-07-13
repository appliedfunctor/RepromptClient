/**
 * Following code influenced by http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 * Accessed 11/07/2016
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
    public jwtToken;
    private registerPath = "/api/auth/register"
    private loginPath = "/api/auth/login"
    private path = new Paths

    constructor(private http: Http) {
        //load existing JWT token from storage
        var loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        this.jwtToken = loginInfo && loginInfo.jwtToken
        console.log(loginInfo ? loginInfo : "No loginInfo")
    }

    register(firstName: String, surName: String, email: String, password: String) {
        return false
    }

    login(email: String, password: String){

        let headers = new Headers({ 'Content-Type': 'application/json', 'X-Auth-Token': '' });
		let options = new RequestOptions({ headers: headers });

        let sendData = JSON.stringify({email: email, password: password });

        console.log(sendData)

        console.log("Executing login: " + this.path.getUrl(this.loginPath))

        //send request to endpoint
        return this.http.post(this.path.getUrl(this.loginPath), sendData, options)
                    .map(this.handleData)
                    .catch(this.handleError);
        
    }

    logout(): void {
        this.jwtToken = null
        localStorage.removeItem('loginInfo')
    }

    private handleData(res: Response) {        
        let jwtToken = res && res.headers && res.headers.get('X-Auth-Token')
        
        let body = res.json()

        // console.log(body)
        // console.log(res.headers)

        // console.log(res)
        
        // console.log(jwtToken ? jwtToken : "No jwtToken")

        if(jwtToken && jwtToken != "") {
            this.jwtToken = jwtToken
            console.log("starting parse")
            let userParsed = new UserModel(body)
            console.log("finished parse")
            localStorage.setItem('loginInfo', JSON.stringify({   
                user: userParsed,
                token: jwtToken
            }))
            console.log("login success")
        } else {
            console.log("login failure")
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