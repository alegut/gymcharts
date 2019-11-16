import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'st-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;
  trainingStarted = false;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private localstorageService: LocalstorageService
  ) { }

  ngOnInit() {
    const date = new Date;
    this.currentYear = date.getFullYear();
    this.trainingService.timerStatus$.subscribe((status: string) => {
      this.trainingStarted = (status === 'start')
    })
  }
  stopTraining() {
    this.trainingService.timerStatus.next('stop');
    this.router.navigate(['/statistics']);
  }
}
