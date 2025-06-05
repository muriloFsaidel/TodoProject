import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const USER_AUTHENTICATED = 'UserAuthenticated';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username:string, password:string ){

    return this.http.post<any>(`${API_URL}/authenticate`,{
      username,
      password
    }).pipe(
      map (
        data => {
          sessionStorage.setItem(USER_AUTHENTICATED, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    )
  }

  getUserAuthenticated() {
    return sessionStorage.getItem(USER_AUTHENTICATED);
  }

  getTokenAuthenticated() {
    if (this.getUserAuthenticated())
      return sessionStorage.getItem(TOKEN);
    return null;
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(USER_AUTHENTICATED);
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem(USER_AUTHENTICATED);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message: string) { }
}

/* Basic Authentication using spring.security
executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem(USER_AUTHENTICATED, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }
  */
/*
  authenticate(username: string, password: string): boolean {
    if (username === "In28Minutes" && password === "dummy") {
      sessionStorage.setItem('UserAuthenticated', username);
      return true;
    }
    return false;
  }
*/