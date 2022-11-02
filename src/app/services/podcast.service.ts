import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetModel } from '../models/getModel';
@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private http: HttpClient) { }

  public getAllPodcast(getModel: GetModel): Observable<any> {
    return this.http.post<any>('http://localhost/swAleteoCrea/index', getModel);
  }
}
