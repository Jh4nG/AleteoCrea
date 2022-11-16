import { Injectable } from '@angular/core';
import { Observable,Subject,Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioObserverService {

  private subject : Subject<any> = new Subject<any>();
  constructor() { }

  sendChangeMusicPlatform(statusAudio : boolean){
    this.subject.next(statusAudio);
  }

  getChangeMusicPlatform(){
    return this.subject.asObservable();
  }
}
