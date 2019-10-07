import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { User } from '../interfaces/user';
import { of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;
  public currenUserSnapshot: User | null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsService: UtilsService,
    private translate: TranslateService
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
    this.setCurrenUserSnapshot();
  }

  setUser(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
    const updatedUser = {
      id: user.user.uid,
      email: user.user.email,
      datebirth: new Date(),
      height: 0,
      image: 'https://firebasestorage.googleapis.com/v0/b/gymcharts-46e9a.appspot.com/o/body.jpg?alt=media&token=f4ffeaaf-c84e-4b83-86c3-fb372a75ae07',
      name,
      role: 'payed_user',
      weight: 0
    }
    userRef.set(updatedUser);
  }

  public signup(name: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.setUser(user);
          return true;
        })
        .catch((err) => false)
    )
  }

  signInWithSocial(choosenProvider) {
    let provider = null;
    switch (choosenProvider) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
    }

    return from(
      this.afAuth.auth.signInWithPopup(provider).then((user) => {
        if(user.additionalUserInfo.isNewUser) {
          this.setUser(user);
        }
        return true;
      })
      .catch((error) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => true)
      .catch(err => false)
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.utilsService.showSnackbar(this.translate.instant('logoutsuccess'));
    });
  }

  private setCurrenUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currenUserSnapshot = user);
  }
}
