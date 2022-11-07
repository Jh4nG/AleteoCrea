import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import MouseMeshInteraction from '../../assets/three.mmi.js';
let camera, scene, renderer;

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
export class ThreePagesComponent implements OnInit {

  treeImg = '../../assets/img/Tree/guacari   03_11_2022.glb';
  public mmi;
  constructor() { }

  ngOnInit(): void {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({ canvas,antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    
    // scene.background_image = new THREE.Color('url(../../assets/img/FondoAzul.png)');

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);

    camera.position.set(4, 0.5, 3); // posición para mostrar objeto de entrada

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render); // use only if there is no animation loop
    controls.minDistance = 3; // Maximo que se puede acercar
    controls.maxDistance = 6; // Maximo que se puede alejar
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
    light.position.set(- 1.25, 1, 1.25);
    scene.add(light);

    // const helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );

    
    // Se agregar la imagen del arbol
    const loader = new GLTFLoader();
    loader.load(this.treeImg, (gltf) => {
      let tree = gltf.scene;
      tree.rotation.set(0, 0, 0);
      tree.scale.set(0.1, 0.1, 0.1);
      tree.position.set(0, -1, 0);
      tree.visible = true;
      scene.add(tree);
      this.render();
    });

    const group = new THREE.Group();

    // helpers

    const helpers = new THREE.Group();
    helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000));
    helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00));
    helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff));
    helpers.visible = false;
    scene.add(helpers);

    
    window.addEventListener('resize', this.onWindowResize);
    this.mmi = new MouseMeshInteraction(scene, camera);
    this.firstScene();
    console.log(this.mmi);
    
    this.render();
  }


  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    this.mmi.update();
    renderer.render(scene, camera);
  }

  firstScene() {
    let red_color = new THREE.Color(0xff0000);
    let geometriCub = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    let materialGeometri = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    let cube = new THREE.Mesh(geometriCub, materialGeometri);
    cube.position.set(1.19, 0.01, -0.1);
    cube.name = 'cubo1';
    
    
    this.mmi.addHandler('cubo1', 'click',function(event)  {
      alert('Hola mundo')
    })
    scene.add( cube );
    
  }

}
