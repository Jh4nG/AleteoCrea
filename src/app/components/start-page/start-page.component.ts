import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare  var $;
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  @Output() eventEmpezar: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(): void  {
    $('#divStartPage').fadeOut(()=>{
      this.eventEmpezar.emit(true);
    });
  }

}
