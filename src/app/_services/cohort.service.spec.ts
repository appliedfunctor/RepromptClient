import { TestBed, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers } from '@angular/http';
import { JsonpModule, Jsonp, BaseRequestOptions, ResponseOptions, Response, Http } from "@angular/http";
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";
import { UserModel } from "app/_models/user.model";
import { JwtHelper, AuthHttp } from "angular2-jwt/angular2-jwt";
import { TestHelper } from "app/_test.libs/test-helper";
import { Observable } from "rxjs/Rx";
import { CohortService } from "app/_services/cohort.service";
import { CohortModel } from "app/_models/cohort.model";

describe('CohortService', () => {

    let component: CohortService
    let mockHttp: AuthHttp

    let cohortData = new Response(new ResponseOptions({
        body: JSON.stringify([new CohortModel({id: 2}), new CohortModel({id: 3})])
    }))
    
    beforeEach( () => {
        mockHttp = TestHelper.mock(Http, 'Http')
        mockHttp.get = jasmine.createSpy('get').and.returnValue(Observable.of(cohortData))
        mockHttp.delete = jasmine.createSpy('get').and.returnValue(Observable.of(cohortData))
        mockHttp.post = jasmine.createSpy('post').and.returnValue(Observable.of(cohortData))
        component = new CohortService(mockHttp)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should make an AuthHttp get request to retrieve a cohort ', () => {
        component.get(1)
        expect(mockHttp.get).toHaveBeenCalledTimes(1)
    })

    it('should make an AuthHttp get request to retrieve containers ', () => {
        component.getAllContainers()
        expect(mockHttp.get).toHaveBeenCalledTimes(1)
    })

    it('should make an AuthHttp get request to save a filecontainer ', () => {
        component.save(new CohortModel({}))
        expect(mockHttp.post).toHaveBeenCalledTimes(1)
    })

    it('should make an AuthHttp get request to delete a cohort ', () => {
        component.delete(1)
        expect(mockHttp.delete).toHaveBeenCalledTimes(1)
    })

    it('should make an AuthHttp get request to assign a user to a cohort ', () => {
        component.attach(1, 1)
        expect(mockHttp.post).toHaveBeenCalledTimes(1)
    })

    it('should make an AuthHttp get request to remove a user from a cohort ', () => {
        component.detach(1, 1)
        expect(mockHttp.delete).toHaveBeenCalledTimes(1)
    })

    it('should make an AuthHttp get request to retrieve containers ', () => {
        component.getAllItems()
        expect(mockHttp.get).toHaveBeenCalledTimes(1)
    })
 
})