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
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  openTextModal()  {
    $('#openModalText').modal('show');
  }
}
