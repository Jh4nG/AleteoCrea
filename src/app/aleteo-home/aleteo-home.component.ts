import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
declare var $; 

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-aleteo-home',
  templateUrl: './aleteo-home.component.html',
  styleUrls: ['./aleteo-home.component.scss']
})
export class AleteoHomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private spinner: NgxSpinnerService) {
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {

    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 3600);

    $('.img-agua').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.01,
      // imageUrl : '../../assets/img/agua.jpg'
    });
  }

  routePages(page: string): void {
    
    this.router.navigateByUrl(`/${page}`);
  }
}
