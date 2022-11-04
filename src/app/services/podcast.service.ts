import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  API = 'http://localhost/swAleteoCrea/index';
  constructor(private http: HttpClient) { }

  public getAllPodcast(): Observable<any> {
    return this.http.get('http://localhost:4000/api/aleteo');
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


}
