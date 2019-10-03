import { LanguageInterface } from './../interfaces/language';
import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackbar: MatSnackBar,
    private localstorageService: LocalstorageService,
    public translate: TranslateService
  ) {}

  showSnackbar(message, action=null, duration=3000, panelClass = ['red-snackbar']): void {
    this.snackbar.open(message, action, {
      duration,
      panelClass
    });
  }

  switchLanguage(): void {
    const currentLang = this.localstorageService.getLangFromLs();
    const oppositeLang = currentLang === 'ru' ? 'ua' : 'ru';
    this.localstorageService.setLangToLs(oppositeLang);
    this.translate.use(oppositeLang);
  }

  getCurrentLanguage(): LanguageInterface {
    const currentLang = this.localstorageService.getLangFromLs();
    return {
      short: currentLang,
      long: currentLang === 'ru' ? 'На русском' : 'Українською',
      image: currentLang === 'ru' ? 'assets/images/flags/russia.svg' : 'assets/images/flags/ukraine.svg'
    }
  }

  getOppositeLanguage(): LanguageInterface {
    const currentLang = this.localstorageService.getLangFromLs();
    return {
      short: currentLang === 'ru' ? 'ua' : 'ru',
      long: currentLang === 'ru' ? 'Українською' : 'На русском',
      image: currentLang === 'ru' ? 'assets/images/flags/ukraine.svg' : 'assets/images/flags/russia.svg'
    }
  }
}
