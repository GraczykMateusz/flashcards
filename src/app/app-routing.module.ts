import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from './components/entry-page/login/login.component';
import {RegisterComponent} from './components/entry-page/register/register.component';
import {ResetPasswordComponent} from './components/entry-page/reset-password/reset-password.component';
import {FlashcardsComponent} from './components/flashcards/flashcards.component';
import {canActivate, emailVerified} from '@angular/fire/auth-guard';
import {map, pipe} from 'rxjs';
import {FlashcardsEditorComponent} from './components/flashcards/flashcards-editor/flashcards-editor.component';

const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectUnauthorizedToLogin = () => redirectUnverifiedTo(['/login']);

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'flashcards/editor', component: FlashcardsEditorComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'flashcards', component: FlashcardsComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
