import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantSpring } from '../constant/constant-spring';
import { Commentaire } from '../Model/commentaire';
import { Region } from '../Model/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constant: ConstantSpring = new ConstantSpring();
  public host = this.constant.host;
  public clientHost = this.constant.client;
  public userHost = this.constant.userPicture;
  public RegionHost = this.constant.regionPicture;

  constructor(private http: HttpClient) { }

  save(region: Region): Observable<Region> {
    return this.http.post<Region>(`${this.host}/region/add`, region);
  }
  
 AddRegion(image: any,
    nomregion: String, coderegion: String, activite: string, langue: string, date: any, description: string, superficie: string, populations: any,pays:any): Observable<any> {

    const data1: FormData = new FormData();

    const data = [{
      image: image,
      nomregion: nomregion,
      coderegion: coderegion,
      activité: activite,
      langue: langue,
      date: date,
      description: description,
      superficie: superficie,
      populations: populations,
      pays:pays
    }]
    console.log(data)
    data1.append('data', JSON.stringify(data).slice(1, JSON.stringify(data).lastIndexOf(']')));
    data1.append('image', image);
    return this.http.post<Region>(`${this.host}/region/add`, data1);
  }


  getOneRegionById(regionId: number): Observable<Region> {
    return this.http.get<Region>(`${this.host}/region/getRegionById/${regionId}`);
  }
  getAllRegion(): Observable<Region[]> {
    return this.http.get<Region[]>(`${"http://localhost:8080/region/mylist"}`);
  }


  saveComment(commentaire: Commentaire): Observable<Comment> {
    return this.http.post<Comment>(`${this.host}/commentaire/add`, commentaire);
  }

  delete(regionId: number): Observable<Region> {
    return this.http.delete<Region>(`${this.host}/region/delete/${regionId}`);
  }


uploadRegionPicture(recipePicture: File) {
  const fd = new FormData();
  fd.append('image', recipePicture, recipePicture.name);
  return this.http.post(`${this.host}/region/photo/upload`, fd, {
    responseType: 'text',
    reportProgress: true,
    observe: 'events'});
}
}
