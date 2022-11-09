import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Input() idTarget: string = '';

  @Input() visibleM: boolean = true;

  @Input() tamanio : String = 'md';

  @Input() bgModal : String;

  @Input() backdrop : String = "true";

  @Input() keyboard : String = "true";

  @Input() visibleCard : boolean = true;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('elementModal') elementModal!: ElementRef<any>;
  
  @ContentChildren(TemplateRef) contentTemplate: QueryList<ElementRef> | undefined;

  public header: any;

  public content: any;

  public footer: any;


  constructor() { }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
    let element = document.getElementById(this.idTarget);
    element.addEventListener('hidden.bs.modal', (event) => {
      this.closeEvent.emit(event);
    }); 
  }

  ngAfterContentInit(): void {
    this.contentTemplate?.forEach((itemTemplate, index) => {
      switch (index) {
        case 0:
          this.header =itemTemplate;
          break;
        case 1:
          this.content = itemTemplate;
          break;
        case 2:
          this.footer = itemTemplate;
          break;
      }
    });
    console.log('Hola mundo');
    
    
  }
}