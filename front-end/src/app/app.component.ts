import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeComponent, LoginComponent, ErrorComponent, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  //template: '<h1>{{title}}</h1>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';
  message = ' Welcome to in28min'
  paragraph : string = 'In this course, we will cover the whole aspects of creating an angular app.'
}