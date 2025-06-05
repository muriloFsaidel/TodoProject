import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username : string = 'in28minutes';
  password : string = '';
  errorMessage : string = 'Invalid Credentials';
  invalidLogin : boolean = false;

  // dependency injection (@Autowired)
  constructor(private router: Router, private basicAuthenticationService : BasicAuthenticationService){}

  handleJWTAuthLogin(): void{
      this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error =>{
          console.log(error);
          this.invalidLogin = true;
        }
      )
  }
}

/*
constructor (....,public hardcodedAuthenticationService: HardcodedAuthenticationService,...)

handleLogin() : void{
    if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      //redirecting the user to the welcome component page
      //passing the username as a parameter
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    }else{
      this.invalidLogin = true;
    }

  }
*/