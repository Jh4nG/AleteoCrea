import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-contents',
  templateUrl: './additional-contents.component.html',
  styleUrls: ['./additional-contents.component.scss']
})
export class AdditionalContentsComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
