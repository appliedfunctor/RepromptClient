/**
 * Following code influenced by http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 * Accessed 11/07/2016
 */

import { Injectable } from "@angular/core"
import { Http, Response} from "@angular/http"
import { Observable } from "rxjs/Observable"
import { UserModel } from "../_models/user.model"
import { ErrorMessage } from "../_models/error.model"
import { Paths } from "../app.paths"
import 'rxjs/add/operator/map'

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
    }

    register(firstName: String, surName: String, email: String, password: String) {
        //send request to endpoint
        var response = this.http.put(this.path.getUrl(this.registerPath), 
                        JSON.stringify({firstName: firstName, 
                                        surName: surName, 
                                        email: email,
                                        password: password
                                        }))
        
        response.map((response: Response) => {
            let jwtToken = response.json() && response.json().token

            if(jwtToken) {
                this.jwtToken = jwtToken
                localStorage.setItem('loginInfo', JSON.stringify({   
                    user: new UserModel(JSON.parse(response.json())),
                    token: response.headers.get('X-Auth-Token')
                }))
                return true
            } else {
                let json = JSON.parse(response.json())
                let error = new ErrorMessage(json)
                console.log(error)
                return false
            }
        }) 
    }

    login(email: String, password: String) {
        //send request to endpoint
        var response = this.http.put(this.path.getUrl(this.loginPath), 
                        JSON.stringify({email: email, 
                                        password: password
                                        }))
        
        response.map((response: Response) => {
            let jwtToken = response.json() && response.json().headers.get('X-Auth-Token')

            if(jwtToken) {
                this.jwtToken = jwtToken
                localStorage.setItem('loginInfo', JSON.stringify({   
                    user: new UserModel(JSON.parse(response.json())),
                    token: response.headers.get('X-Auth-Token')
                }))
                return true
            } 
            let json = JSON.parse(response.json())
            let error = new ErrorMessage(json)
            console.log(error)
            return false
        }) 
    }

    logout(): void {
        this.jwtToken = null
        localStorage.removeItem('loginInfo')
    }
}