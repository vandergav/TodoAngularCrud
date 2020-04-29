import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  public ngOnInit() {
    this.api
      .getAllTodos()
      .subscribe((res) => this.todos = res,
        err => console.log(err))
  }

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {
  }

  onAddTodo(todo: Todo) {
    // todo.id = this.todos.length + 1
    todo.id = uuidv4();
    todo.complete = false
    this.api
      .createTodo(todo)
      .subscribe(
        (res) => {
          console.log(res)
        },
        err => console.log(err));
    let newTodos = this.todos.slice(0);
    newTodos.push(new Todo(todo));
    this.todos = newTodos;
  }

  onToggleTodoComplete(todo: Todo) {
    todo.complete = !todo.complete;
    console.log("todo.complete")
    console.log(todo.complete)
    this.api
      .updateTodo(todo)
      .subscribe((res) => console.log(res),
        err => console.log(err));
  }

  onRemoveTodo(todo: Todo) {
    this.api
      .deleteTodoById(todo.id)
      .subscribe((res) => {
        console.log(res)
      },
        err => console.log(err));
    let newTodos = this.todos.slice(0);
    newTodos = newTodos.filter((t) => t.id !== todo.id);
    this.todos = newTodos
  }

  doSignOut() {
    this.auth.doSignOut();
    this.router.navigate(['/sign-in']);
  }

  // get todos() {
  //   return this.api
  //     .getAllTodos()
  //     .subscribe((res) => this.todos = res,
  //       err => console.log(err));
  // }
}
