import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Region } from '../Model/region';
import { RegionService } from './region.service';

@Injectable({
  providedIn: 'root'
})
export class RegionResolverService implements Resolve<Region>{

  constructor(private regionService: RegionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Region> {
    const regionId: number = route.params["regionId"]
    return this.regionService.getOneRegionById(regionId)
  }

}
