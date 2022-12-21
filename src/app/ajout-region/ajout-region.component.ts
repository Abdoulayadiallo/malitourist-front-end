import { Component, OnInit } from '@angular/core';
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
  pays!: any;
  constructor(private regionService:RegionService) { }

  ngOnInit() {
    this.AjouterRegion();
  }
  UploadImage(event: any){
    this.image = event.target["files"][0]
    console.log(this.image);
  }

  AjouterRegion(){
    this.regionService.AddRegion(this.image,this.nomregion,this.coderegion,this.activite,this.langue,this.date,this.description,this.superficie,this.populations,this.pays).subscribe(data=>{
          console.log(data)
       });
  }
}
