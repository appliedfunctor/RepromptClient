// import { TestBed, async } from '@angular/core/testing';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { Headers } from '@angular/http';
// import { AuthService } from './auth.service';
// import { JsonpModule, Jsonp, BaseRequestOptions, ResponseOptions, Response, Http } from "@angular/http";
// import { tick } from "@angular/core/testing";
// import { fakeAsync } from "@angular/core/testing";
// import { UserModel } from "app/_models/user.model";

// describe('AuthService', () => {

//     let service: AuthService
//     let server: MockBackend
//     let loginValidResponse: Object
//     let loginInvalidResponse: Object
//     let registerValidResponse: Object
//     let registerInvalidResponse: Object
//     let token: String
//     let registerUser: UserModel

//     this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxLWk0d1IrUjhQdzNSQUxRZ1ltb2psUzN1RzdYWkpkN3dVanhyVWRQclpoQkNhRTFMbStrYjhaaDZEU1dtdnVVdGJcL25KZG1QWFF2d0tjV2tqRGxRMFFib2MxTXRoQURNSG1wUDQ1WjU0R0NzSkFQUkU9IiwiaXNzIjoicGxheS1zaWxob3VldHRlIiwiZXhwIjoxNTAxNzk2MDk2LCJpYXQiOjE1MDE3NTI4OTYsImp0aSI6ImIxZDI3MTRmZjM0MGUzNGEyODJjM2UyY2I5MGUyY2NhM2QwYmMwZThmNTgxODlkMGMxZTgwZTEzMmE0NTA1OTRmZTY3MmNiMDVjZDlkY2Q2NWIxYmE0MTg1N2RjNWRjMWUwMWRkNzBhZjFiMTNiYWUyY2Y3ZTg5YzMwMWRmMTU1MzM4MDQwOGI2NGRmZDJiMDg0MTI1NTgzMjFlYmI0YzhhZDY0NWRiYmZkMTE2YTEwNjAwNGVmMmI0NzA1ZjYyOTgzMDA1Y2E0OTc4YzhhYTM4MmE1MWE3ZDM0Njk2MTQwYjQ3Zjk4OTVlYjA1ODlkZWU1MjViYmQ5YjQwOWYyMzIifQ.T6d6lpuVhcGepS3y4aBkr0TOvUi8ULkK75pciPBuOGE"
   
//     this.loginValidResponse = {
//         "id": 63,
//         "firstName": "Terry",
//         "surName": "Phillips",
//         "email": "Someone@anaddress.co.uk",
//         "isEmailVerified": false,
//         "isEducator": false,
//         "isAdministrator": false
//     };

//     this.loginInvalidResponse = {
//         "error": "No Such User Found"
//     };

//     this.registerValidResponse = {
//         "id": 79,
//         "firstName": "Fake",
//         "surName": "User",
//         "email": "fake@user.com",
//         "isEmailVerified": false,
//         "isEducator": false,
//         "isAdministrator": false
//     }

//     this.registerInvalidResponse = {
//         "error": "Credentials Already Registered"
//     }

//     this.registerUser = new UserModel({
//         "firstName": "Fake",
//         "surName": "User",
//         "email": "fake@user.com",
//         "password": "faked"
//     })

//     //configure the testbed
//     beforeEach( () => {
//         TestBed.configureTestingModule({
//         imports: [JsonpModule],
//         providers: [
//             AuthService,
//             MockBackend,
//             BaseRequestOptions,
//             {
//                 provide: Http,
//                 useFactory: (server, options) => new Http(server, options),
//                 deps: [MockBackend, BaseRequestOptions]
//             }
//         ]
//         })

//         //retrieve the service and mock server from the testbed
//         service = TestBed.get(AuthService);
//         server = TestBed.get(MockBackend); 
//     }
//     );
    
    

//     it('should handle a valid response to a login', fakeAsync( () => {

//         let headerData = new Headers({  'Content-Type': 'application/json',
//                                         'X-Auth-Token': this.token
//         })

//         //configure the mock server response
//         server.connections.subscribe(connection => { 
//             connection.mockRespond(new Response(new ResponseOptions({
//                 body: JSON.stringify(this.loginValidResponse),
//                 status: 200,
//                 headers: headerData
//             })));
//         });

//         service.login("Someone@anaddress.co.uk", "pass").subscribe(data => {
//             console.log(data)
//             expect(data.hasOwnProperty('error')).toBeFalsy            
//             expect(data.hasOwnProperty('id')).toBeTruthy
//             expect(data.id).toEqual(63);
//             expect(service.isAuthenticated).toBeTruthy
//         })
//     }))

//     // it('should handle an invalid response to a login', fakeAsync( () => {

//     //     let headerData = new Headers({ 'Content-Type': 'application/json', 'X-Auth-Token': this.token });

//     //     //configure the mock server response
//     //     server.connections.subscribe(connection => { 
//     //         connection.mockRespond(new Response(new ResponseOptions({
//     //             body: JSON.stringify(this.loginInvalidResponse),
//     //             status: 200,
//     //             headers: headerData
//     //         })));
//     //     });

//     //     service.login("Someone@anaddress.co.uk", "pass").subscribe(data => {
//     //         console.log(data)
//     //         expect(data.hasOwnProperty('error')).toBeTruthy
//     //         expect(data.error).toEqual("No Such User Found")
//     //         expect(service.isAuthenticated).toBeFalsy
//     //     })
//     // }))

//     // it('should handle a valid response to a registration', fakeAsync( () => {

//     //     let headerData = new Headers({ 'Content-Type': 'application/json' });

//     //     //configure the mock server response
//     //     server.connections.subscribe(connection => { 
//     //         connection.mockRespond(new Response(new ResponseOptions({
//     //             body: JSON.stringify(this.registerValidResponse),
//     //             status: 200,
//     //             headers: headerData
//     //         })));
//     //     });

//     //     service.register(this.registerUser).subscribe(data => {
//     //         console.log(data)
//     //         expect(data.hasOwnProperty('error')).toBeFalsy            
//     //         expect(data.hasOwnProperty('id')).toBeTruthy
//     //         expect(data.id).toEqual(79);
//     //         expect(service.isAuthenticated).toBeTruthy
//     //     })
//     // }))

//     // it('should handle an invalid response to a registration', fakeAsync( () => {

//     //     let headerData = new Headers({ 'Content-Type': 'application/json' });

//     //     //configure the mock server response
//     //     server.connections.subscribe(connection => { 
//     //         connection.mockRespond(new Response(new ResponseOptions({
//     //             body: JSON.stringify(this.registerInvalidResponse),
//     //             status: 200,
//     //             headers: headerData
//     //         })));
//     //     });

//     //     service.register(this.registerUser).subscribe(data => {
//     //         console.log(data)
//     //         expect(data.hasOwnProperty('error')).toBeTruthy
//     //         expect(data.error).toEqual("Credentials Already Registered")
//     //         expect(service.isAuthenticated).toBeFalsy
//     //     })
//     // }))

// })