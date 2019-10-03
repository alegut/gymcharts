import { LocalstorageService } from './services/localstorage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './animations/animations';
import { TranslateService } from '@ngx-translate/core';


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
    private loadingService: LoadingService,
    public translate: TranslateService,
    private localstorageService: LocalstorageService
  ){
    translate.setDefaultLang('ru');
  }

  ngOnInit(){
    this.subscriptions.push(this.loadingService.isLoading.subscribe(isLoading => {
      this.loading = isLoading;
    }))
    const userLang = this.localstorageService.getLangFromLs();
    if(userLang) {
      this.translate.use(userLang);
    }
  }



  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
