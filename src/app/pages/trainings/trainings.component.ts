import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TrainingService } from 'src/app/services/training.service';


@Component({
  selector: 'st-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {  
  startTime: string;
  

  constructor(
    private localstorageService: LocalstorageService,
    private trainingService: TrainingService,
    private localStorageService: LocalstorageService
  ) { }

  ngOnInit() {
    this.startTime = this.localStorageService.getTimeFromLs();
  }

  initTraining() {
    this.localstorageService.setTimetToLs();
    this.startTime = this.localStorageService.getTimeFromLs();
    this.trainingService.initTimer('start');
  }

}
