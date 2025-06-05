import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../app.constants';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`);
  }

  executeHelloWorldBeanServiceWithVariable(name: string) {    
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean/path-variable/${name}`);
    }
}


/*  createBasicAuthenticationHttpHeader() {    
    let username = 'in28minutes';
    let password = 'dummy';
    let basicAuthenticationString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthenticationString;
  }
    let basicAuthenticationString = this.createBasicAuthenticationHttpHeader();
    let headers = new HttpHeaders({ Authorization : basicAuthenticationString});

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/path-variable/${name}`, {headers});
*/