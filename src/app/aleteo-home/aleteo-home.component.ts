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
    
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3600);
    
    $('.img-agua').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.01,
      // imageUrl : '../../assets/img/agua.jpg'
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
    // animación podcast
    // let podcastOver = document.getElementById('podcast-link');
    // podcastOver.addEventListener('mouseover', () => {
    //   let podcasText = document.getElementById('podcast-animated');
    //   podcasText.classList.forEach((item) => {
    //     if(item == 'animate__fadeOut') {
    //       podcasText.classList.remove('animate__fadeOut');
    //     }
    //     if(item == 'show-item') {
    //       podcasText.classList.remove('show-item');
    //     }
    //   });
    //   podcasText.classList.add('animate__fadeIn');
    //   setTimeout(()=> {
    //     podcasText.classList.remove('animate__fadeIn');
    //     podcasText.classList.add('animate__fadeOut');
    //   }, 1500);
    // });
    // // animación Tienda
    // let tiendaOver = document.getElementById('tienda-link');
    // tiendaOver.addEventListener('mouseover', () => {
    //   let tiendaText = document.getElementById('tienda-animated');
    //   tiendaText.classList.forEach((item) => {
    //     if(item == 'animate__fadeOut') {
    //       tiendaText.classList.remove('animate__fadeOut');
    //     }
    //     if(item == 'show-item') {
    //       tiendaText.classList.remove('show-item');
    //     }
    //   });
    //   tiendaText.classList.add('animate__fadeIn');
    //   setTimeout(()=> {
    //     tiendaText.classList.remove('animate__fadeIn');
    //     tiendaText.classList.add('animate__fadeOut');
    //   }, 1500);      
    // });

    // // animación Arbol
    // let ArbolOver = document.getElementById('arbol-link');
    // ArbolOver.addEventListener('mouseover', () => {
    //   let arbolText = document.getElementById('arbol-animated');
    //   arbolText.classList.forEach((item) => {
    //     if(item == 'animate__fadeOut') {
    //       arbolText.classList.remove('animate__fadeOut');
    //     }
    //     if(item == 'show-item') {
    //       arbolText.classList.remove('show-item');
    //     }
    //   });
    //   arbolText.classList.add('animate__fadeIn');
    //   setTimeout(()=> {
    //     arbolText.classList.remove('animate__fadeIn');
    //     arbolText.classList.add('animate__fadeOut');
    //   }, 1500); 
      
    // });

    // // animación contenidos
    // let contenidosOver = document.getElementById('contenidos-link');
    // contenidosOver.addEventListener('mouseover', () => {
    //   let contenidoText = document.getElementById('contenidos-animated');
    //   contenidoText.classList.forEach((item) => {
    //     if(item == 'animate__fadeOut') {
    //       contenidoText.classList.remove('animate__fadeOut');
    //     }
    //     if(item == 'show-item') {
    //       contenidoText.classList.remove('show-item');
    //     }
    //   });
    //   contenidoText.classList.add('animate__fadeIn');
    //   setTimeout(()=> {
    //     contenidoText.classList.remove('animate__fadeIn');
    //     contenidoText.classList.add('animate__fadeOut');
    //   }, 1500); 
      
    // });
    
  }
  routePages(page: string): void {
    this.router.navigateByUrl(`/${page}`);
  }

  pointerEvent(ala: number): void {
    // console.log(ala);
  }
}
