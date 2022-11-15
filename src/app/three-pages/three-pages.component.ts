import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgImageSliderComponent } from 'ng-image-slider';
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

  constructor(private spinner: NgxSpinnerService) {

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
        $('#openModalThreeIcono4').modal('show');
        break;
      case 'Icono5':
        $('#openModalThreeIcono5').modal('show');
        break;
      case 'Icono6':
        $('#openModalThreeIcono6').modal('show');
        break;
      case 'Icono7':
        $('#openModalThreeIcono7').modal('show');
        break;
      case 'Icono8':
        $('#openModalThreeIcono8').modal('show');
        break;
      case 'Icono9':
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
}


