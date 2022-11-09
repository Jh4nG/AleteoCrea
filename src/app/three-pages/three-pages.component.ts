import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import MouseMeshInteraction from '../../assets/three.mmi.js';
let camera, scene, renderer;

declare var $;

const params = {
  clipIntersection: true,
  planeConstant: 0,
  showHelpers: false
};

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

  treeImg = '../../assets/img/Tree/guacari prueba.gltf';
  public mmi;
  public routeSub: any;

  public openModal: boolean = false;
  constructor(private route: Router) { }

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    //scene.background = new THREE.Color('white')

    // scene.background_image = new THREE.Color('url(../../assets/img/FondoAzul.png)');

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);

    camera.position.set(4, 0.5, 3); // posición para mostrar objeto de entrada

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render); // use only if there is no animation loop
    controls.minDistance = 3; // Maximo que se puede acercar
    controls.maxDistance = 6; // Maximo que se puede alejar
    controls.enablePan = false;

    //const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    //light.position.set(- 1.25, 1, 1.25);
    // scene.add(light);

    // const helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );


    // Se agregar la imagen del arbol
    const loader = new GLTFLoader();
    this.mmi = new MouseMeshInteraction(scene, camera);
    loader.load(this.treeImg, (gltf) => {
      let tree = gltf.scene;
      tree.rotation.set(0, 0, 0);
      tree.scale.set(0.1, 0.1, 0.1);
      tree.position.set(0, -1, 0);
      tree.visible = true;
      scene.add(tree);

      this.mmi.addHandler('insectos-11', 'click', function (event) {
        alert('Hola mundo');
      });

      this.mmi.addHandler('Desvanecida', 'click',(event) => {
        $('#openReproductor').modal('show')
      });

      this.render();
    });

    
    const group = new THREE.Group();


    window.addEventListener('resize', this.onWindowResize);
    window.requestAnimationFrame(() => this.render());

  }


  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  render(): void {

    renderer.render(scene, camera);
    this.mmi.update();
    setTimeout(() => {
      window.requestAnimationFrame(() => { this.render() });
    }, 60);
  }

  // firstScene() {
  //   let geometriCub = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  //   // let materialGeometri = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   let materialGeometri = new THREE.MeshBasicMaterial(
  //     {
  //       color: 0x00ff00,
  //       transparent: true,
  //       opacity: 1,
  //       wireframe: true
  //     }
  //   );
  //   let cube = new THREE.Mesh(geometriCub, materialGeometri);
  //   cube.position.set(1.19, 0.01, -0.1);
  //   cube.name = 'cubo1';


  //   this.mmi.addHandler('cubo1', 'click', function (event) {
  //     alert('Hola mundo')
  //   });

  //   this.mmi.addHandler('cubo1', 'mouseover', (event) => {
  //     console.log(event);
      
  //     console.log('hola mundo');
      
  //   });

  //   scene.add(cube);
  // }

  // secondElement(): void {
  //   let geometriCub = new THREE.BoxGeometry(1, 0.1, 0.2);
  //   let materialGeometri = new THREE.MeshBasicMaterial(
  //     { 
  //       color: 0xffffff, 
  //       transparent: true, 
  //       opacity: 1, 
  //       wireframe: true 
  //     }
  //   );
  //   // let materialGeometri = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  //   let cube = new THREE.Mesh(geometriCub, materialGeometri);
  //   cube.position.set(-1.5, 0.01, -0.1);
  //   cube.name = 'cubo2';

  //   this.mmi.addHandler('cubo2', 'click', function (event) {
  //     alert('Hola mundo 2')
  //   })

  //   scene.add(cube);
  // }
}
