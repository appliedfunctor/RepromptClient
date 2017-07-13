export class UserModel {
    id: Number;
    firstName: String;
    surName: String;
    email: String;
    password: String;
    isEmailVerified: Boolean;
    isEducator: Boolean;
    isAdministrator: Boolean;
    avatarUrl: String;

    constructor(userData) {
        this.id = userData.id ? userData.id : null;
        this.firstName = userData.firstName ? userData.firstName : null;
        this.surName = userData.surName ? userData.surName : null;
        this.email = userData.email ? userData.email : null;
        this.password = userData.password ? userData.password : null;
        this.isEmailVerified = userData.isEmailVerified ? userData.isEmailVerified : null;
        this.isEducator = userData.isEducator ? userData.isEducator : null;
        this.isAdministrator = userData.isAdministrator ? userData.isAdministrator : null;
        this.avatarUrl = userData.avatarUrl ? userData.avatarUrl : null;
    }
}