import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { of, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
import { last, first, takeLast } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public timerStatus = new Subject<string>();

  timerStatus$ = this.timerStatus.asObservable();
  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  changeTimerStatus(status) {
    this.timerStatus.next(status)
  }

  createTraining() {
    this.authService.currentUser.subscribe((user: User) => {
      const userRef = this.db.collection(`users/${user.id}/trainings`).add({ time: new Date() }).then(res => {
        console.log(res.id);
        localStorage.setItem('trainingId', res.id);
        this.db.doc(`users/${user.id}/trainings/${res.id}`).update({finish: new Date()}).then(res => {
          console.log(res);
        });
    })
      // this.db.collection(`users/${user.id}/trainings`, ref => ref.orderBy('time')).valueChanges().subscribe(res => {
      //   console.log(res[res.length - 1])
      // });
    })

  }

    
  
  
}
