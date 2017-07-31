import { isDevMode } from '@angular/core';

export class Paths {
    secure = false;
    base = "127.0.0.1:9000"
    //base = "www.reprompt.com"
    http = "http://"
    https = "https://"

    getUrl(append: string) {
        let start = this.secure ? this.https : this.http
        if(isDevMode() && !append.startsWith("http")) {
            return start + this.base + append
        }        
        return append
    }

    getBaseUrl(append: string) {
        console.log(`called: ${append}`)
        if(isDevMode() && !append.startsWith("http")) return this.http + this.base + '/'
        return ""
    }

    getBase() {
        if(isDevMode()) return this.http + this.base + '/'
        return ""
    }
}