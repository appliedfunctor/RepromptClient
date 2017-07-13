export class Paths {
    secure = false;
    base = "127.0.0.1:9000"
    http = "http://"
    https = "https://"

    getUrl(append: String) {
        let start = this.secure ? this.https : this.http
        return start + this.base + append
    }
}