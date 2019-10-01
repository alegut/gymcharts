import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements  OnInit, OnDestroy{
  public opened = false;
  public loading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private loadingService: LoadingService
  ){}

  ngOnInit(){
    this.subscriptions.push(this.loadingService.isLoading.subscribe(isLoading => {
      this.loading = isLoading;
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
}
