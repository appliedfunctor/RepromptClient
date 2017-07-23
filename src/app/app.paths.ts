import { isDevMode } from '@angular/core';

export class Paths {
    secure = false;
    base = "127.0.0.1:9000"
    //base = "www.reprompt.com"
    http = "http://"
    https = "https://"

    getUrl(append: string) {
        let start = this.secure ? this.https : this.http
        if(isDevMode()) {
            return start + this.base + append
        }        
        return append
    }
}