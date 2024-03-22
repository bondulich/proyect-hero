import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string, duration: number=4000) {
    this._snackBar.open(message, action, {duration});
  }
}
