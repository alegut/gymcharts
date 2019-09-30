import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {  

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message, action, duration, panelClass = ['red-snackbar']) {
    this.snackbar.open(message, action, {
      duration,
      panelClass
    });
  }
}
