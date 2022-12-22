import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pays } from '../Model/pays';
import { PaysService } from '../service/pays.service';

@Component({
  selector: 'app-pays-modal',
  templateUrl: './pays-modal.component.html',
  styleUrls: ['./pays-modal.component.scss'],
})
export class PaysModalComponent implements OnInit {
  pays: Pays = new Pays();

  constructor(private paysService:PaysService,private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  AjouterPays(){
      this.paysService.addPays(this.pays).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
    
  }


}
