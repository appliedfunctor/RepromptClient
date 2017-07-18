export class ErrorMessage {
    message: string;

    constructor(errorData) {
        this.message = errorData ? errorData : "No error message received";
    }
}