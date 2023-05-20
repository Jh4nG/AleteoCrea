import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AudioObserverService } from '../services/audioObserver/audio-observer.service';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { PodcastService } from '../services/podcast.service';

declare var $;

const clipPlanes = [
  new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, - 1), 0)
];


@Component({
  selector: 'app-three-pages',
  templateUrl: './three-pages.component.html',
  styleUrls: ['./three-pages.component.scss']
})
export class ThreePagesComponent implements OnInit, OnDestroy {

  public acctionSelected: string;

  @ViewChild('nav') slider: NgImageSliderComponent;

  constructor(private spinner: NgxSpinnerService, private audioService: AudioObserverService,
    public service : PodcastService) {

  }

  ngOnInit(): void {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode));
    setTimeout(()=>{
      $('.videoMuestra').fadeIn();
      setTimeout(()=>{
        $('.videoMuestra').fadeOut();
        $('.content-fixed').fadeIn();
      },5000);
    },2000);
    if(!(window.location.hostname == 'localhost')){
      this.service.getIPAddress().subscribe((res:any)=>{  
        let ipAddress = res.ip;
        this.service.setVisitador(ipAddress,'Árbol').subscribe(resp =>{
          if(resp.status == 200){
            console.log(`Éxito: ${resp.msg}`);
          }else{
            console.log(`Error: ${resp.msg}`);
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  openTextModal() {
    $('#openModalText').modal('show');
  }

  actionClickObject(object: string) {
    let video;
    this.acctionSelected = object;
    switch (this.acctionSelected) {
      case 'Icono1':
        $('#openModalThreeIcono1').modal('show');
        break;
      case 'Icono2':
        $('#openModalThreeIcono2').modal('show');
        break;
      case 'Icono3':
        $('#openModalThreeIcono3').modal('show');
        break;
      case 'Icono4':
        video = document.getElementById('icono4') as HTMLVideoElement;
        video.play();
        this.silenceAudio();
        $('#openModalThreeIcono4').modal('show');
        break;
      case 'Icono5':
        video = document.getElementById('icono5') as HTMLVideoElement;
        video.play();
        this.silenceAudio();
        $('#openModalThreeIcono5').modal('show');
        break;
      case 'Icono6':
        video = document.getElementById('icono6') as HTMLVideoElement;
        video.play();
        this.silenceAudio();
        $('#openModalThreeIcono6').modal('show');
        break;
      case 'Icono7':
        video = document.getElementById('icono7') as HTMLVideoElement;
        video.play();
        this.silenceAudio();
        $('#openModalThreeIcono7').modal('show');
        break;
      case 'Icono8':
        video = document.getElementById('icono8') as HTMLVideoElement;
        video.play();
        $('#openModalThreeIcono8').modal('show');
        break;
      case 'Icono9':
        video = document.getElementById('icono9') as HTMLVideoElement;
        video.play();
        this.silenceAudio();
        $('#openModalThreeIcono9').modal('show');
        break;
      case 'Nido':
        $('#openModalIconoNido').modal('show');
        break;
      default:
        break;
    }
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }

  silenceAudio() {
    this.audioService.sendChangeMusicPlatform(false);
  }

  activeAudio(id: string) {
    let video = document.getElementById(id) as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
    this.audioService.sendChangeMusicPlatform(true);
  }

}


