import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../enum/alert-type';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.redirectUrl) {
        this.router.navigateByUrl(this.accountService.redirectUrl);
      } else {
        this.router.navigateByUrl('/accueil');
      }
    } else {
      this.router.navigateByUrl('/connexion');
    }
  }

  onLogin(utilisateur: Utilisateur): void {
    this.loadingService.isLoading.next(true);
    console.log(utilisateur);
    this.subscriptions.push(
      this.accountService.login(utilisateur).subscribe(
        response => {
          const token: string|any = response.headers.get('Authorization');
          this.accountService.saveToken(token);
          if (this.accountService.redirectUrl) {
            this.router.navigateByUrl(this.accountService.redirectUrl);
          } else {
            this.router.navigateByUrl('/accueil');
          }
          this.loadingService.isLoading.next(false);
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            'Username ou mots de passe incorrect. Essayer encore.',
            AlertType.DANGER
          );
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }
}
