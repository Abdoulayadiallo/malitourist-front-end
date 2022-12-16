import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoirRegionPageRoutingModule } from './voir-region-routing.module';

import { VoirRegionPage } from './voir-region.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoirRegionPageRoutingModule
  ],
  declarations: [VoirRegionPage]
})
export class VoirRegionPageModule {}
