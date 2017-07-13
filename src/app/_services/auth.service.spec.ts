import { TestBed, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { JsonpModule, Jsonp, BaseRequestOptions, ResponseOptions, Http } from "@angular/http";
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";

describe('AuthService', () => {

    let service: AuthService;
    let server: MockBackend;   
    let validResponse: Object; 
    let invalidResponse: Object;
    let token: String;

    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLW9Ocm54VFI0NnIya1UxMjZFMEZKRjZqclBCR005aEVKYnI2SU4xYjMxUDhjeFFKRlZhQXo3RUdETzVHRWwwdjdLMjRIUHdjZnRGMktjaXdLdmFNRjY2ekJcL3RkOHVDanA2KzV3Um8wWDJiVzRrSmhJYW9FOGhyST0iLCJpc3MiOiJwbGF5LXNpbGhvdWV0dGUiLCJleHAiOjE0OTk5NDY1ODQsImlhdCI6MTQ5OTkwMzM4NCwianRpIjoiZTA3NWRmNTc0MmI1MWQ1NWUwMGFjZjU4NWMwYWQ4MDg1MGFhYjllZDZkMDE2Njc4YTRhMGM0MTkxODgxNjA0ZDhlMWZlYWRmNmNlN2MzNjNhNmUxZjYzNzllMjM4MDQ0YzViZDhkNmRhMDJlMWQwZGY2YzY1MmE3MTlhM2Q5NWI5NzJlODc2ZTM4ZTRiNzg2MWU2ZWI4YmRiMDVjYTYyMDg5MDc1ODAwMWYzMzNmZGI3MzdhZGQ0YTY5NTcyOGJjZTdjYWVkYjU0MGYzYTAxNGZiNzUwMDMxNmI4MmY5NjgxY2VmYzQ5OGYzMGJjOTM2MjhlOTdhZTViM2Q1N2E0ZCJ9.2ve8dgHgv_EetcSmLqotBpSE0LfWv9zvIT2MXcGlvw4";
   
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

        //let headerData: responseOptionArgs.Headers = new responseOptionArgs.Headers();
        let headerData = new Headers({ 'Content-Type': 'application/json', 'X-Auth-Token': this.token });
        headerData.append('Content-Type', 'application/json');
        headerData.append("X-Auth-Token", this.token);

        //configure the mock server response
        server.connections.subscribe(connection => { 
            connection.mockRespond(new ResponseOptions({
                body: JSON.stringify(validResponse),
                status: 200,
                headers: headerData
            }));
        });

        let response = service.login("Someone@anaddress.co.uk", "pass")

        tick()

        expect(response).toEqual(true);
        expect(service.jwtToken).toEqual(true);
    }))
})