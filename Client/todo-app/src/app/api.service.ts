import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService implements OnInit {

  constructor(
    private http: HttpClient, private session: SessionService
  ) { }

  ngOnInit(): void {
    // this.getAllTodos()
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    // will use this.http.get()
    const options = this.getRequestOptions()
    var subject = new Subject<Todo[]>();
    this.http
      .get(API_URL + '/api/v1/transactions', options)
      .subscribe((res: Array<Todo>) => subject.next(res),
        err => console.log(err))
    return subject.asObservable()
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    // will use this.http.post()
    const options = this.getRequestOptions()
    var subject = new Subject<Todo>();
    this.http
      .post(API_URL + '/api/v1/transactions', todo, options)
      .subscribe((res: Todo) => subject.next(res),
        err => console.log(err))
    return subject.asObservable()
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<number> {
    // will use this.http.get()
    const options = this.getRequestOptions()
    var subject = new Subject<number>();
    this.http
      .get(API_URL + '/api/v1/transactions/' + todoId, options)
      .subscribe((res: number) => subject.next(res),
        err => console.log(err))
    return subject.asObservable()
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    // will use this.http.put()
    const options = this.getRequestOptions()
    var subject = new Subject<Todo>();
    this.http
      .put(API_URL + '/api/v1/transactions/' + todo, todo, options)
      .subscribe((res: Todo) => subject.next(res),
        err => console.log(err))
    return subject.asObservable()
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number) {
    // will use this.http.delete()
    const options = this.getRequestOptions()
    var subject = new Subject<string>();
    this.http
      .delete(API_URL + '/api/v1/transactions/' + todoId, options)
      .subscribe((res: string) => subject.next(res),
        err => console.log(err))
    return subject.asObservable()
  }

  // ***JWT Authentication***
  public signIn(username: string, password: string) {
    var subject = new Subject<any>();
    this.http
      .post(API_URL + '/api/v1/sign-in', {
        username,
        password
      }).subscribe((res: any) => subject.next(res),
        err => console.log(err))
    return subject.asObservable()
  }

  private getRequestOptions() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    console.log(headers.get('Authorization'))
    return ({ headers });
  }
}
