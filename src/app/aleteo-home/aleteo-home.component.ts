import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
declare var $; 

import { NgxSpinnerService } from 'ngx-spinner';
import { PodcastService } from '../services/podcast.service';

@Component({
  selector: 'app-aleteo-home',
  templateUrl: './aleteo-home.component.html',
  styleUrls: ['./aleteo-home.component.scss']
})
export class AleteoHomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public statusStart: boolean = false;
  constructor(private router: Router, private spinner: NgxSpinnerService,
    public service : PodcastService) {
  }
  ngOnDestroy(): void {
    window.location.reload();
  }
  ngOnInit(): void {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode, {boundary: document.body}));
    $('.img-agua').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.01
    });
    if(!(window.location.hostname == 'localhost')){
      this.service.getIPAddress().subscribe((res:any)=>{  
        let ipAddress = res.ip;
        this.service.setVisitador(ipAddress,'Inicio').subscribe(resp =>{
          if(resp.status == 200){
            console.log(`Éxito: ${resp.msg}`);
          }else{
            console.log(`Error: ${resp.msg}`);
          }
        });
      });
    } 
  }
  ngAfterViewInit(): void {
  }
  routePages(page: string): void {
    this.router.navigateByUrl(`/${page}`);
  }
  pointerEvent(ala: number): void {
  }
}
