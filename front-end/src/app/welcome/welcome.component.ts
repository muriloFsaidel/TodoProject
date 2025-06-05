import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  name:string = '';
  customizedWelcomeMessage:string= '';

  constructor(private route: ActivatedRoute, 
    private service : WelcomeDataService){}

  ngOnInit(){
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
      this.service.executeHelloWorldBeanService().subscribe(
          response => this.customizedWelcomeMessage = response.message,
          error =>  { this.customizedWelcomeMessage = error.error.message,
                     console.log(error)}
      );      
  }

  getWelcomeMessageWithVariable(){
    this.service.executeHelloWorldBeanServiceWithVariable(this.name).subscribe(
      response => this.customizedWelcomeMessage = response.message,
      error => this.customizedWelcomeMessage = error.error.message
    );
  }
  
}
