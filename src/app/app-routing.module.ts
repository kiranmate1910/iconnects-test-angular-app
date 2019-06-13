import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './registration/registration.module#RegistrationModule' },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
