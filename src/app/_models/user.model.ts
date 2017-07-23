import { UserRoles } from "app/enums/user.roles.enum";
import { FileElement } from "app/_models/fileElement.type";

export class UserModel implements FileElement {
    id: number
    firstName: string
    surName: string
    email: string
    password: string
    isEmailVerified: boolean
    isEducator: boolean
    isAdministrator: boolean
    avatarUrl: string

    name: string

    constructor(userData) {
        this.id = userData.id ? userData.id : null;
        this.firstName = userData.firstName ? userData.firstName : "";
        this.surName = userData.surName ? userData.surName : "";
        this.email = userData.email ? userData.email : "";
        this.password = userData.password ? userData.password : "";
        this.isEmailVerified = userData.isEmailVerified ? userData.isEmailVerified : false;
        this.isEducator = userData.isEducator ? userData.isEducator : false;
        this.isAdministrator = userData.isAdministrator ? userData.isAdministrator : false;
        this.avatarUrl = userData.avatarUrl ? userData.avatarUrl : "assets/blankProfileBlue.svg";

        this.name = this.firstName + " " + this.surName
    }

    getName(): string {
        return this.firstName + " " + this.surName
    }

    getSearchValues(): string[] {
        return [this.firstName, this.surName, this.email]
    }

    getRole(): string {
        let roles = new UserRoles   
        if (this.isAdministrator) {
            return roles.Administrator
        }
        
        if (this.isEducator) {
            return roles.Educator
        }
        return roles.Student
    }
    
}