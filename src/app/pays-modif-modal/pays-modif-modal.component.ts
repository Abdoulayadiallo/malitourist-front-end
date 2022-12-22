import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pays } from '../Model/pays';
import { PaysService } from '../service/pays.service';

@Component({
  selector: 'app-pays-modif-modal',
  templateUrl: './pays-modif-modal.component.html',
  styleUrls: ['./pays-modif-modal.component.scss'],
})
export class PaysModifModalComponent implements OnInit {
  pays: Pays = new Pays();
  id!: number;
  data: any;
  constructor(private paysService:PaysService,private route: ActivatedRoute,) { }
  
  ngOnInit() {}
    ModifierPays(){
    this.paysService.updatePays(this.data,this.pays).subscribe(data => {
      console.log(data);
    },
    error => console.log(error));
  }

}
