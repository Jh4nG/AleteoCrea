import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AudioObserverService } from '../services/audioObserver/audio-observer.service';

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

  // public imageObject: Array<object> = [
  //   {
  //     image: 'assets/img/Tree/MovimientCallejero/icono3/Mariposas_gIF.gif',
  //     thumbImage: 'assets/img/Tree/MovimientCallejero/icono3/Mariposas_gIF.gif',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   }
  // ];

  constructor(private spinner: NgxSpinnerService, private audioService: AudioObserverService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  openTextModal() {
    $('#openModalText').modal('show');
  }

  actionClickObject(object: string) {
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
        this.silenceAudio();
        $('#openModalThreeIcono4').modal('show');
        break;
      case 'Icono5':
        this.silenceAudio();
        $('#openModalThreeIcono5').modal('show');
        break;
      case 'Icono6':
        this.silenceAudio();
        $('#openModalThreeIcono6').modal('show');
        break;
      case 'Icono7':
        this.silenceAudio();
        $('#openModalThreeIcono7').modal('show');
        break;
      case 'Icono8':
        $('#openModalThreeIcono8').modal('show');
        break;
      case 'Icono9':
        this.silenceAudio();
        $('#openModalThreeIcono9').modal('show');
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


