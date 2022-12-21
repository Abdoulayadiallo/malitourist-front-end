import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AjoutRegionComponent } from '../ajout-region/ajout-region.component';
import { Region } from '../Model/region';
import { RegionService } from '../service/region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {
  region = new Region;

  constructor(private modalCtrl: ModalController,private regionService:RegionService) { }
  regions!: Region[];;
  ngOnInit() {
    this.AfficherRegion();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AjoutRegionComponent,
    });
    modal.present();
  }
  AfficherRegion(){
    this.regionService.getAllRegion().subscribe(data => {
      this.regions = data;
    });
  }


  
}
