import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from "./header/header.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { AccountService } from './service/account.service';
import { LoadingService } from './service/loading.service';
import { RegionService } from './service/region.service';
import { AlertService } from './service/alert.service';
import { RegionResolverService } from './service/region-resolver.service';
import { AuthenticationGuard } from './guard/authentication.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AppComponent, HeaderComponent, ResetPasswordComponent, ProfileComponent, RegionDetailsComponent],
    providers: [AccountService,
        LoadingService,
        RegionService,
        AlertService,
        RegionResolverService,
        AuthenticationGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
    imports: [ BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgxLoadingModule.forRoot({}),
        IonicModule.forRoot(), 
        AppRoutingModule,
        FontAwesomeModule
    ]
})
export class AppModule { }
