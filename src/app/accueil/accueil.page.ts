import { Component, OnInit } from '@angular/core';
import { Pays } from '../Model/pays';
import { PaysService } from '../service/pays.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  payss!: Pays[];


  constructor(private paysService:PaysService) { }

  ngOnInit() {
    this.AfficherPaysInfo();
  }
  AfficherPaysInfo(){
    this.paysService.getAllPays().subscribe(data => {
      this.payss = data;
    });
  }
}
