import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { TrainingsComponent } from './pages/trainings/trainings.component';
import { AuthGuard } from './guards/auth.guard';
import { StatisticsComponent } from './pages/statistics/statistics.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'trainings', component: TrainingsComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
