export class ErrorMessage {
    message: String;

    constructor(errorData) {
        this.message = errorData ? errorData : "No error message received";
    }
}