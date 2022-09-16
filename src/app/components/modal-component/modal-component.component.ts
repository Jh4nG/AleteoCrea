import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit, AfterContentInit {

  @Input() idTarget: string = '';

  @Input() visibleM: boolean = true;
  
  @ContentChildren(TemplateRef) contentTemplate: QueryList<ElementRef> | undefined;

  public header: any;

  public content: any;

  public footer: any;


  constructor() { }
  
  ngOnInit(): void {
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
  }

}
