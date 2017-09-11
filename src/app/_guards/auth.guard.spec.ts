// import { TestBed, async } from '@angular/core/testing'
// import { AuthGuard } from './auth.guard'
// import { AuthService } from "app/_services/auth.service"
// import { Router, CanActivate } from '@angular/router'
// import { RouterTestingModule } from "@angular/router/testing"

// describe('Auth Guard', () => {

//     let mockService = { canActivate: jasmine.createSpy('isAuthenticated').and.returnValue(true) }
//     let mockRouter = { navigate: jasmine.createSpy('navigate') }
//     let fixture
//     let component

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//         imports: [
//             RouterTestingModule.withRoutes([]),
//         ],
//         providers: [   
//         { provide: AuthService, useValue: mockService },
//         { provide: Router, useValue: mockRouter },
//         ],
//     }).compileComponents().then(() => {
//         fixture = TestBed.createComponent(AuthGuard)
//         component = fixture.componentInstance
//     })
//   }))

//   it('should return true for an authenticated user', async(() => {
//     expect(component.canActivate()).toBeTruthy()
//   }))

// //   it('should return false for an unauthenticated user', async(() => {
// //     expect(component.canActivate()).toBeFalsy()
// //   }))

// })