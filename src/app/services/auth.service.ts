import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;
  public currenUserSnapshot: User | null;

  constructor(
    private router: Router
  ) { 
    this.currentUser = of(null);
  }

  public signup(name: string, email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public logout(): void {
    this.router.navigate(['/login'])
  }

  private setCurrenUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currenUserSnapshot = user);
  }
}
