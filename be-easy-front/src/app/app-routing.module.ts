import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { UserRoutingComponent } from './user-routing/user-routing.component';
import { authGuardGuard } from './_shared/auth-guard.guard';
import { BikeComponent } from './bike/bike.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[authGuardGuard] },
  { path: 'user', component: BoardUserComponent, canActivate:[authGuardGuard] },
  { path: 'map', component: UserRoutingComponent, canActivate:[authGuardGuard] },
  { path: 'bike', component: BikeComponent, canActivate: [authGuardGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
