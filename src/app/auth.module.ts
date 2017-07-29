import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => {
            let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
            let jwtToken = loginInfo && loginInfo.token
            return jwtToken
        }),
		//globalHeaders: [{'Content-Type':'multipart/mixed'}],
	}), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}