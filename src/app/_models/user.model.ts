import { UserRoles } from "app/enums/user.roles.enum";

export class UserModel {
    id: Number;
    firstName: String;
    surName: String;
    email: String;
    isEmailVerified: Boolean;
    isEducator: Boolean;
    isAdministrator: Boolean;
    avatarUrl: String;

    constructor(userData) {
        this.id = userData.id ? userData.id : null;
        this.firstName = userData.firstName ? userData.firstName : "";
        this.surName = userData.surName ? userData.surName : "";
        this.email = userData.email ? userData.email : "";
        this.isEmailVerified = userData.isEmailVerified ? userData.isEmailVerified : false;
        this.isEducator = userData.isEducator ? userData.isEducator : false;
        this.isAdministrator = userData.isAdministrator ? userData.isAdministrator : false;
        this.avatarUrl = userData.avatarUrl ? userData.avatarUrl : "assets/blankProfile.png";
    }

    getRole(): String {
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