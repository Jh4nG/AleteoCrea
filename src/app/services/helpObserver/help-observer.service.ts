import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HelpObserverService {

  private subject: Subject<any> = new Subject<any>();

  constructor() { }

  public sendOpenHelp(statusHelp: boolean): void {
    this.subject.next(statusHelp);
  }

  public getStatusHelp() {
    return this.subject.asObservable();
  }
}
