import { HomeComponent } from "app/home/home.component";
import { TestHelper } from "app/_test.libs/test-helper";
import { AuthService } from "app/_services/auth.service";
import { UserModel } from "app/_models/user.model";

describe('FileNavigationComponent', () => {

    let mockAuthService = TestHelper.mock(AuthService, 'AuthService')
    mockAuthService.getCurrentUser = jasmine.createSpy('getCurrentUser').and.returnValue(new UserModel({}))
    let component: HomeComponent = new HomeComponent(mockAuthService)

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})