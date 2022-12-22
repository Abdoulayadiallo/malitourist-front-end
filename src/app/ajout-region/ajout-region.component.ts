import { Component, OnInit } from '@angular/core';
import { Pays } from '../Model/pays';
import { Population } from '../Model/population';
import { PaysService } from '../service/pays.service';
import { RegionService } from '../service/region.service';

@Component({
  selector: 'app-ajout-region',
  templateUrl: './ajout-region.component.html',
  styleUrls: ['./ajout-region.component.scss'],
})
export class AjoutRegionComponent implements OnInit {
  image!: string;
  nomregion!: string;
  coderegion!: string;
  activite!: string;
  langue!: string;
  date!: Date;
  description!: string;
  superficie!: string;
  commentaires!: any;
  populations!: any;
  paysSel!: any;
  region: any;
  payss!: Pays[];
  populationss!: Population[];
  constructor(private regionService:RegionService, private paysService:PaysService) { }

  ngOnInit() {
    this.AfficherPays();
  }
  UploadImage(event: any){
    this.image = event.target["files"][0]
    console.log(this.image);
  }

  AjouterRegion(){
    this.regionService.AddRegion(this.image,this.nomregion,this.coderegion,this.activite,this.langue,this.date,this.description,this.superficie,this.populations,this.paysSel).subscribe(data=>{
        this.region = data;
          console.log(data)
       });
  }
  AfficherPays(){
    this.regionService.getAllPopulation().subscribe(data => {
      this.populationss = data
      console.log(data);
    },
    error => console.log(error));
  }
  AfficherPopulation(){
    this.paysService.getAllPays().subscribe(data => {
      this.payss = data
      console.log(data);
    },
    error => console.log(error));
  }
}
