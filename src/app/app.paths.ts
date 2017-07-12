export class Paths {
    secure = false;
    base = "www.reprompt.com"
    http = "http://"
    https = "https://"

    getUrl(append: String) {
        let start = this.secure ? this.https : this.http
        return start + this.base + append
    }
}