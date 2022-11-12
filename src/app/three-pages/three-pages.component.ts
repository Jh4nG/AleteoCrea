import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as THREE from 'three';


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

  constructor() {

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
        $('#openModalThreeIcono2').modal('show');
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
}
