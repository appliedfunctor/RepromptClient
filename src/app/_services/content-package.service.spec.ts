import { ContentPackageService } from "app/_services/content-package.service";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { AuthService } from "app/_services/auth.service";
import { TestHelper } from "app/_test.libs/test-helper";

describe('ContentPackageService', () => {

    let component: ContentPackageService
    let mockAuthHttp: AuthHttp
    let mockService: AuthService

    beforeEach( () => {

        mockAuthHttp = jasmine.createSpyObj('mockAuthHttp', ['get'])
        mockService = TestHelper.mock('AuthService', AuthService)

        component = new ContentPackageService(mockAuthHttp, mockService)
    })

    it('should create', () => {
        expect(component).toBeTruthy()    
    })

})