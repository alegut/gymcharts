import { LanguageInterface } from './../../interfaces/language';
import { UtilsService } from 'src/app/services/utils.service';
import { LocalstorageService } from './../../services/localstorage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'st-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() navToggle = new EventEmitter<null>();
  public currentUser: any = null;
  public lang: LanguageInterface;

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private localstorageService: LocalstorageService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.lang = this.utilsService.getOppositeLanguage();
  }

  toggleSidenav() {
    this.navToggle.emit();
  }

  switchLang() {
    this.utilsService.switchLanguage();
    this.lang = this.utilsService.getOppositeLanguage();
  }


  logout() {
    this.authService.logout();
  }

}
