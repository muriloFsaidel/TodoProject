import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, DatePipe } from '@angular/common';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
/*
public class Todo {
public Todo(Long id,
String description,
boolean done,
LocalDate date)}
*/
export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }
}
@Component({
  selector: 'app-list-todos',
  imports: [NgIf, NgFor, UpperCasePipe, DatePipe],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent implements OnInit {

  todos: Array<Todo> = [];

  message: string = '';

  username: any;

  constructor(
    private todoService: TodoDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('UserAuthenticated');
    if(this.username === '' || this.username === null){
        this.username = 'in28minutes';
    }
    console.log('list-todos: ' + this.username)
    this.refreshTodos();
  }

  refreshTodos(): void {
    this.todoService.retrieveAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        this.message = `Delete of todo ${id} successfull`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id: number): void {
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}

/*todos : Array<Todo> = [
    new Todo(1,'learn to Dance',false, new Date()),
    new Todo(2, 'Become an Expert at Angular',false, new Date()),
    new Todo(3,'Visit India', false, new Date())        
  ];*/