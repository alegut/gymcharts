import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { User } from '../interfaces/user';
import { of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;
  public currenUserSnapshot: User | null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { 
    this.currentUser = this.afAuth.authState
      .pipe(
        switchMap((user) => {
          if(user) {
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
      )
    )
  }

  public signup(name: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid, 
            email: user.user.email,
            datebirth: new Date(),
            height: 0,
            image: 'https://firebasestorage.googleapis.com/https://firebasestorage.googleapis.com/v0/b/gymcharts-46e9a.appspot.com/o/body.jpg?alt=media&token=f4ffeaaf-c84e-4b83-86c3-fb372a75ae07/b/chat-b093d.appspot.com/o/profile.jpg?alt=media&token=f2be4b4f-9835-41f9-a4d9-3bd67da9a361',
            name,
            role: 'payed_user',
            weight: 0
          }
          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    )
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
