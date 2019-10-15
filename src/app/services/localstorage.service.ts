import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setLangToLs(lang) {
    localStorage.setItem('lang', lang);
  }

  getLangFromLs() {
    return localStorage.getItem('lang');
  }

  setTimetToLs() {
    localStorage.setItem('starttime', (+ new Date()).toString());
  }

  getTimeFromLs() {
    return localStorage.getItem('starttime');
  }

  clearTimeFromLs() {
    localStorage.removeItem('starttime');
  }
}
