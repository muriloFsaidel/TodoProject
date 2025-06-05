import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string): boolean {
    if (username === "In28Minutes" && password === "dummy") {
      sessionStorage.setItem('UserAuthenticated', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('UserAuthenticated');
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem('UserAuthenticated');
  }
}
