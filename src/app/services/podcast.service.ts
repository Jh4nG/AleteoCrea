import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetModel } from '../models/getModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  API = environment.api;
  constructor(private http: HttpClient) { }

  public getAllPodcast(getModel: GetModel): Observable<any> {
    return this.http.post<any>(this.API, getModel);
  }

  public savePodcast(name = 'Anónimo', file : any, time : any) : Observable <any> {
    let data = {
      "controlador": "Podcast",
      "metodo": "createNewPodcast",
      "podcast": {
          "createPodcast": {
              "name_user": name,
              "check_terminos": true,
              "time_audio" : time
          },
          "file": file
      }
    }
    return this.http.post(this.API, data);
  }

  public getPodcast() : Observable <any> {
    let data = {
      "controlador": "Podcast",
      "metodo": "getDataPodcastUser"
    }
    return this.http.post(this.API, data);
  }

  public getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  }

  public setVisitador(ipAddress : any, page : string) : Observable <any> {
    let data = {
      "controlador": "Visita",
      "metodo": "insertVisita",
      "ip": ipAddress,
      "page" : page
    }
    return this.http.post(this.API, data);    
  }

  public finishBuy(items : Array<any> = [], name : String = "", email : String = ""){
    let data = {
      "controlador": "Tienda",
      "metodo": "buyProducts",
      "usuario" : name,
      "emails" : email,
      "items" : items
    }
    return this.http.post(this.API, data);
  }
}
