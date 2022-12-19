import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertType } from '../enum/alert-type';
import { Alert } from '../Model/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alerts: Subject<Alert> = new Subject();

  constructor() { }

  showAlert(message: string, alterType: AlertType): void {
    const alert = new Alert(message, alterType);
    this.alerts.next(alert);
  }
}
