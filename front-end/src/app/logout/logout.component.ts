import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(public hardcodedAuthenticationService: HardcodedAuthenticationService){}

  ngOnInit(){
    this.hardcodedAuthenticationService.logout();
  }

}
