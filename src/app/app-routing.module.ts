import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AjoutRegionComponent } from './ajout-region/ajout-region.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ProfileComponent } from './profile/profile.component';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'region',
    loadChildren: () => import('./region/region.module').then( m => m.RegionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'voir-region',
    loadChildren: () => import('./voir-region/voir-region.module').then( m => m.VoirRegionPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'region/:regionId', component: RegionDetailsComponent},
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'ajout-region', component: AjoutRegionComponent, },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
