import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChartsModule } from 'ng2-charts';
import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListHeaderComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoListFooterComponent,
    TodosComponent,
    PageNotFoundComponent,
    SignInComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [TodoDataService, ApiService, SessionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
