import { TestBed, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { JsonpModule, Jsonp, BaseRequestOptions, ResponseOptions, Response, Http } from "@angular/http";
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";

describe('AuthService', () => {

    let service: AuthService;
    let server: MockBackend;   
    let validResponse: Object; 
    let invalidResponse: Object;
    let token: String;

    this.token = "fake-jwt-token";
   
    this.validResponse = {
        "id": 63,
        "firstName": "Terry",
        "surName": "Phillips",
        "email": "Someone@anaddress.co.uk",
        "isEmailVerified": false,
        "isEducator": false,
        "isAdministrator": false
    };

    this.invalidResponse = {
        "error": "Authentication required"
    };

    //configure the tesbed
    beforeEach( () => {
        TestBed.configureTestingModule({
        imports: [JsonpModule],
        providers: [
            AuthService,
            MockBackend,
            BaseRequestOptions,
            {
            provide: Http,
            useFactory: (server, options) => new Http(server, options),
            deps: [MockBackend, BaseRequestOptions]
            }
        ]
        })

        //retrieve the service and mock server from the testbed
        service = TestBed.get(AuthService);
        server = TestBed.get(MockBackend); 
    }
    );
    
    

    it('should handle a valid response to a login', fakeAsync( () => {

        let headerData = new Headers({ 'Content-Type': 'application/json', 'X-Auth-Token': this.token });

        //configure the mock server response
        server.connections.subscribe(connection => { 
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(this.validResponse),
                status: 200,
                headers: headerData
            })));
        });

        service.login("Someone@anaddress.co.uk", "pass").subscribe(data => {
            console.log(data)
            expect(data.hasOwnProperty('error')).toBeFalsy            
            expect(data.hasOwnProperty('id')).toBeTruthy         
            expect(data.id).toEqual(63);
            expect(service.isAuthenticated).toBeTruthy
        })
    }))
})