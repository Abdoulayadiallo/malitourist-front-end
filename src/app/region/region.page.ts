import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjoutRegionComponent } from '../ajout-region/ajout-region.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AjoutRegionComponent,
    });
    modal.present();
  }

}
