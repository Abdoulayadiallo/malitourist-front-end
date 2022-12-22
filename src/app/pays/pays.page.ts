import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pays } from '../Model/pays';
import { PaysModalComponent } from '../pays-modal/pays-modal.component';
import { PaysModifModalComponent } from '../pays-modif-modal/pays-modif-modal.component';
import { PaysService } from '../service/pays.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],
})
export class PaysPage implements OnInit {
  pays: Pays = new Pays();
  payss!: Pays[];

  constructor(private paysService:PaysService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.AfficherPays()
  }
  AjouterPays(){
      this.paysService.addPays(this.pays).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
    
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PaysModalComponent,
    });
    modal.present();
  }
  async openModalModif(id: number) {
    const modal = await this.modalCtrl.create({
      component: PaysModifModalComponent,
      componentProps:{
        'data':id
      }
    });
    modal.present();
  }
AfficherPays(){
  this.paysService.getAllPays().subscribe(data => {
    this.payss = data
    console.log(data);
  },
  error => console.log(error));
}
SupprimerPays(id:number){
  this.paysService.DelPays(id).subscribe(data => {
    console.log(data);
    this.AfficherPays();
  },
  error => console.log(error));
}

}
