import { UserRoles } from "app/enums/user.roles.enum";

describe('UserRoles', () => {
    
    let component: UserRoles = new UserRoles()

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should hold expected values', () => {
        expect(component.Unauthenticated).toBe("Unauthenticated")
        expect(component.Administrator).toBe("Administrator")
        expect(component.Educator).toBe("Educator")
        expect(component.Student).toBe("Student")
    })
})