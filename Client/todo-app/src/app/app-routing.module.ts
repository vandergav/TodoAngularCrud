import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppComponent } from './app.component';
import { CanActivateTodosGuard } from './can-activate-todos.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    // redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'todos',
    // component: AppComponent
    component: TodosComponent,
    canActivate: [
      CanActivateTodosGuard
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CanActivateTodosGuard
  ]
})
export class AppRoutingModule { }
