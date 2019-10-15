import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'st-timer',
  template: `<span>{{time | lowercase}}</span>`,
  styles: ['span {font-size: 1.6rem}']
})
export class TimerComponent implements OnInit {
  time: string = null;

  constructor(
    private trainingService: TrainingService,
    private localStorageService: LocalstorageService) { }

  ngOnInit() {
    this.startTimer();
    this.trainingService.timerStatus$.subscribe((status: string) => {
      if(status === 'start') {
        this.startTimer();
      }
    })
  }

  startTimer() {
    const startTime = this.localStorageService.getTimeFromLs();
    if (!startTime) return;
    setInterval(() => {
      const diff = Math.round((+ new Date() - (+startTime)) / 1000);
      this.time = this.getTimer(diff);
    }, 1000)
  }

  getTimer(t) {
    let hours, minutes, seconds;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      hours = hours < 10 ? '0' + hours : hours,
      minutes = minutes < 10 ? '0' + minutes : minutes,
      seconds = seconds < 10 ? '0' + seconds : seconds,
    ].join(':');
  }

}
