import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public timerStatus = new Subject<string>();

  timerStatus$ = this.timerStatus.asObservable();
  constructor(
  ) { }

  initTimer(status) {
    this.timerStatus.next(status)
  }

  
}
