import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoirRegionPage } from './voir-region.page';

const routes: Routes = [
  {
    path: '',
    component: VoirRegionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoirRegionPageRoutingModule {}
