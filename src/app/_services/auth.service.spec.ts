import { TestBed, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { JsonpModule, Jsonp, BaseRequestOptions, ResponseOptions, Response, Http } from "@angular/http";
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";
import { UserModel } from "app/_models/user.model";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { TestHelper } from "app/_test.libs/test-helper";
import { Observable } from "rxjs/Rx";

describe('AuthService', () => {

    let component: AuthService
    let mockHttp: Http
    let mockJwtHelper: JwtHelper
    let jwtExpiry = Date.now() + 3600
    
    beforeEach( () => {
        mockHttp = TestHelper.mock(Http, 'Http')
        mockHttp.get = jasmine.createSpy('get').and.returnValue(Observable.of({id: 47}))
        mockHttp.post = jasmine.createSpy('post').and.returnValue(Observable.of({
            headers: {get: () => "token"},
            body: {id: 97}
        }))

        mockJwtHelper = jasmine.createSpyObj('mockJwtHelper', ['isTokenExpired'])
        mockJwtHelper.isTokenExpired = jasmine.createSpy('isTokenExpired').and.returnValue(false)
        mockJwtHelper.getTokenExpirationDate = jasmine.createSpy('getTokenExpirationDate').and.returnValue({
            getTime: () => jwtExpiry,
        })
        component = new AuthService(mockHttp, mockJwtHelper)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should obtain the time until token expiry plus 5ms', () => {
        let currentTime = Date.now()
        expect(component.getTokenExpiryDuration(currentTime)).toBe(jwtExpiry - currentTime + 5)
    })

    it('should start Auth Checks', () => {
        expect(component.subscription).toBeUndefined
        component.startAuthChecks()
        expect(component.subscription).toBeDefined
    })

    it('should continue Auth Checks if authenticated', () => {
        expect(component.subscription).toBeUndefined
        component.jwtToken = "f"
        component.startAuthChecks()
        expect(component.subscription).toBeDefined
        component.startAuthChecks()
        expect(component.subscription).toBeDefined
    })

    it('should make an http post request to login', () => {
        component.login("e@mail", "pass")
        expect(mockHttp.post).toHaveBeenCalledTimes(1)
    })

    it('should make an http post request to register', () => {
        component.register(new UserModel({}))
        expect(mockHttp.post).toHaveBeenCalledTimes(1)
    })

    it('should retrieve jwt from localstorage', () => {
        localStorage.setItem('loginInfo', JSON.stringify({   
            user: new UserModel({id: 54}),
            token: "token"
        }))
        expect(component.getToken()).toBe("token")
        component.clearUserData()
        expect(component.getToken()).toBe(null)
    })

    it('should retrieve the current user', () => {
        expect(component.getCurrentUser().id).toBe(null)
    })

    


})