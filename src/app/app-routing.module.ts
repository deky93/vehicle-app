import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { UnitsComponent } from './units/units.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { UserUnitsComponent } from './userunits/userunits.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'home',component:HomeComponent,//canActivate:[AuthGuard],
  children: [
    { path: 'history', component: HistoryComponent },
    { path: 'monitoring', component: MonitoringComponent },
    { path: 'units', component: UnitsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'userunits', component: UserUnitsComponent },
    { path: '**', redirectTo: 'home' }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
