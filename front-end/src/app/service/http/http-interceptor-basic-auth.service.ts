import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService : BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let token = this.basicAuthenticationService.getTokenAuthenticated();
    let username = this.basicAuthenticationService.getUserAuthenticated();

    if (token && username){
      request = request.clone({
        setHeaders : {
          Authorization : token
        }
      })
    }   

    return next.handle(request);
  }
}

/*let username = 'in28minutes';
    let password = 'dummy';
    let basicAuthenticationString = 'Basic ' + window.btoa(username + ':' + password);
*/
