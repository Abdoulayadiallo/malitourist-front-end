import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../enum/alert-type';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.redirectUrl) {
        this.router.navigateByUrl(this.accountService.redirectUrl);
      } else {
        this.router.navigateByUrl('/home');
      }
    } else {
      this.router.navigateByUrl('/signup');
    }
  }

  onRegister(utilisateur:Utilisateur): void {
    this.loadingService.isLoading.next(true);
    console.log(utilisateur);
    this.subscriptions.push(
    this.accountService.register(utilisateur).subscribe(
      response => {
        this.loadingService.isLoading.next(false);
        this.alertService.showAlert(
          'You have registered successfully. Please check your email for account details.',
          AlertType.SUCCESS
        );
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.loadingService.isLoading.next(false);
        const errorMsg: string = error.error;
        if (errorMsg === 'username Existe') {
          this.alertService.showAlert(
            'Ce username existe déjà. Veuillez essayer avec un autre username',
            AlertType.DANGER
          );
        } else if (errorMsg === 'email Existe') {
          this.alertService.showAlert(
            'Cette email existe déjà. Veuillez essayer avec une autre adresse e-mail',
            AlertType.DANGER
          );
        } else {
          this.alertService.showAlert(
            'Un problème est survenu. Veuillez réessayer.',
            AlertType.DANGER
          );
        }
      }
    )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
