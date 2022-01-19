import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistarComponent } from './components/registar/registar.component';
import { FriendsComponent } from './components/friends/friends.component';

const routes: Routes = [
  {path: "", component : HomeComponent},
  {path: "registar", component : RegistarComponent},
  {path: "login", component : LoginComponent},
  {path: "home",component: HomeComponent},
  {path: "friends",component: FriendsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
