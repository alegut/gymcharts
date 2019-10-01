import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {  

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message, action=null, duration=3000, panelClass = ['red-snackbar']) {
    this.snackbar.open(message, action, {
      duration,
      panelClass
    });
  }
}
