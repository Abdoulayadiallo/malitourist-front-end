import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../enum/alert-type';
import { PasswordChange } from '../Model/password-change';
import { Region } from '../Model/region';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';
import { LoadingService } from '../service/loading.service';
import { RegionService } from '../service/region.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  regionId!: number;
  regions: Region = new Region();
  utilisateur!: Utilisateur;
  host!: string;
  userHost!: string;
  RegionHost!: string;
  username!: string | any;
  profilePictureChange!: boolean;
  profilePicture!: File;

  constructor(
    private route: ActivatedRoute,
    public accountService: AccountService,
    private regionService: RegionService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.username = this.route.snapshot.paramMap.get('username');
    this.host = this.regionService.host;
    this.userHost = this.regionService.userHost;
    this.RegionHost = this.regionService.RegionHost;
    // this.getUserInfo(this.username);
    this.loadingService.isLoading.next(false);
  }

  // getUserInfo(username: string): void {
  //   this.subscriptions.push(
  //     this.accountService.getUserInformation(username).subscribe(
  //       (response: User) => {
  //         this.user = response;
  //         this.getRegionsByUsername(this.user.username);
  //       },
  //       error => {
  //         console.log(error);
  //         this.user = null;
  //       }
  //     )
  //   );
  // }



  onProfilePictureSelected(event: any): void {
    console.log(event);
    this.profilePicture = event.target.files[0] as File;
    console.log(this.profilePicture);
    this.profilePictureChange = true;
  }

  onUpdateUser(updatedUser: Utilisateur): void {
    this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.accountService.updateUser(updatedUser).subscribe(
        response => {
          console.log(response);
          if (this.profilePictureChange) {
            this.accountService.uploadeUserProfilePicture(this.profilePicture);
          }
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            'Profile updated successfully.',
            AlertType.SUCCESS
          );
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            'Profile update failed. Please try again..',
            AlertType.DANGER
          );
        }
      )
    );
  }

  onChangePassword(passwordChange: PasswordChange) {
    console.log(passwordChange);
    const element: HTMLElement = document.getElementById(
      'changePasswordDismiss'
    ) as HTMLElement;
    element.click();
    this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.accountService.changePassword(passwordChange).subscribe(
        response => {
          console.log(response);
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            'Password was updated successfully',
            AlertType.SUCCESS
          );
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          const errorMsg: string = error.error;
          this.showErrorMessage(errorMsg);
        }
      )
    );
  }

  private showErrorMessage(errorMessage: string): void {
    if (errorMessage === 'PasswordNotMatched') {
      this.alertService.showAlert(
        'Passwords do not match. Please try again.',
        AlertType.DANGER
      );
    } else if (errorMessage === 'IncorrectCurrentPassword') {
      this.alertService.showAlert(
        'The current password is incorrect. Please try again.',
        AlertType.DANGER
      );
    } else {
      this.alertService.showAlert(
        'Password change failed. Please try again.',
        AlertType.DANGER
      );
    }
  }

  seeOneRegion(regionId:number): void {
    this.router.navigate(['/region', regionId]);
    console.log(regionId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
