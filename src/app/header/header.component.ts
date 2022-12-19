import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../enum/alert-type';
import { Region } from '../Model/region';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';
import { LoadingService } from '../service/loading.service';
import { RegionService } from '../service/region.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  utilisateur!: Utilisateur;
  host!: string;
  userHost!: string;
  regionHost!: string;
  regionPicture!: File;
  userName!: string ;
  userLoggedIn!: boolean;
  showNavbar!: boolean;
  showSuccessAlert!: boolean;
  photoName!: string;
  progress!: number;
  newRegionURL!: string;
  clientHost!: string;
  postFail!: boolean;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private accountService: AccountService,
    private regionService: RegionService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.host = this.regionService.host;
    this.clientHost = this.regionService.clientHost;
    this.userHost = this.regionService.userHost;
    this.regionHost = this.regionService.RegionHost;
    this.showNavbar = true;
    if (this.accountService.isLoggedIn()) {
      this.userName = this.accountService.loggInUsername;
      this.getUserInfo(this.userName);
      this.loadingService.isLoading.next(false);
    } else {
      this.showNavbar = false;
      this.loadingService.isLoading.next(false);
    }
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        this.userLoggedIn = true;
        this.showNavbar = true;
      },
      error => {
        console.log(error);
        this.userLoggedIn = false;
      }
    ));
  }


  getUserProfile(username: string): void {
    this.router.navigate(['/profile', username]);
  }

  getSearchUserProfile(username: string): void {
    const element: HTMLElement = document.getElementById(
      'closeSearchModal'
    ) as HTMLElement;
    element.click();
    this.router.navigate(['/profile', username]);
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  onFileSelected(event: any): void {
    console.log('file was seletected');
    this.regionPicture = event.target.files[0];
    this.photoName = this.regionPicture.name;
  }

  onNewPost(region: Region): void {
    const element: HTMLElement = document.getElementById(
      'dismissOnSubmitPost'
    ) as HTMLElement;
    element.click();
    this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.regionService.save(region).subscribe(
        (response: Region) => {
          console.log(response);
          let regionId: number = response.id;
 //         this.savePicture(this.regionPicture);
          this.loadingService.isLoading.next(false);
          this.newRegionURL = `${this.clientHost}/region/${regionId}`;
        },
        error => {
          console.log(error);
          this.postFail = true;
          this.loadingService.isLoading.next(false);
        }
      )
    );
  }

  // savePicture(picture: File): void {
  //   this.subscriptions.push(
  //     this.regionService.uploadPostPicture(picture).subscribe(
  //       response => {
  //         if (response.type === HttpEventType.UploadProgress) {
  //           this.progress = (response.loaded / response.total) * 100;
  //         } else {
  //           console.log(response);
  //           this.OnNewPostSuccess(8);
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  //   );
  // }

  OnNewPostSuccess(second: number): void{
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
     // this.newPostURL = null;
    }, second * 1000);
  }

  logOut(): void {
    this.loadingService.isLoading.next(true);
    this.accountService.logOut();
    this.router.navigateByUrl('/inscription');
    this.loadingService.isLoading.next(false);
    this.alertService.showAlert(
      'You have been successfully logged out.',
      AlertType.SUCCESS
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }
}