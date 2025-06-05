import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, DatePipe, NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  id: number = 0;
  todo: Todo = new Todo(this.id,'', false, new Date());
  username: any;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.username = sessionStorage.getItem('UserAuthenticated');
    if (this.username === '' || this.username === null) {
      this.username = 'in28minutes';
    }
    console.log('todo: ' + this.username)
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.todoService.retrieveTodo(this.username, this.id)
        .subscribe(data => this.todo = data);
    }
  }

  saveTodo(): void {

    if (this.id == -1) {
      this.todoService.createTodo(this.username, this.todo)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['todos'])
          }
        )
    } else {
      this.todoService.updateTodo(this.username, this.id, this.todo)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['todos']);
          }
        );
    }

  }
}
