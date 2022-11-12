import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import MouseMeshInteraction from '../../../assets/three.mmi.js';
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
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit, OnDestroy {

  @Output() sendObjectSelected: EventEmitter<any> = new EventEmitter<any>();

  treeImg = '../../assets/img/Tree/GUACARÍ CON ICONOS b 11_11_2022.gltf';
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

    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
    // cercanía, 

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

      this.mmi.addHandler('Icono1', 'click',(event) => {
        this.sendObjectSelected.emit('Icono1');
      });

      this.mmi.addHandler('Icono2', 'click',(event) => {
        this.sendObjectSelected.emit('Icono2');
      });

      this.mmi.addHandler('Icono3', 'click',(event) => {
        this.sendObjectSelected.emit('Icono3');
      });

      this.mmi.addHandler('Icono4', 'click',(event) => {
        this.sendObjectSelected.emit('Icono4');
      });

      this.mmi.addHandler('Icono5', 'click',(event) => {
        this.sendObjectSelected.emit('Icono5');
      });
      
      this.mmi.addHandler('Icono6', 'click',(event) => {
        this.sendObjectSelected.emit('Icono6');
      });

      this.mmi.addHandler('Icono7', 'click',(event) => {
        this.sendObjectSelected.emit('Icono7');
      });

      this.mmi.addHandler('Icono8', 'click',(event) => {
        this.sendObjectSelected.emit('Icono8');
      });

      this.mmi.addHandler('Icono9', 'click',(event) => {
        this.sendObjectSelected.emit('Icono9');
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

}
