import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantSpring } from '../constant/constant-spring';
import { Pays } from '../Model/pays';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  constant: ConstantSpring = new ConstantSpring();
  public host = this.constant.host;
  public clientHost = this.constant.client;

  constructor(private http:HttpClient) { }
  
  getAllPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>("http://localhost:8080/pays/mylist");
  }

}
