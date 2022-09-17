import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

  treeImg = '../../assets/img/Tree/guacari03_1.gltf';
  constructor() { }

  ngOnInit(): void {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);

    camera.position.set(4, 0.5, 3); // posición para mostrar objeto de entrada

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render); // use only if there is no animation loop
    controls.minDistance = 3; // Maximo que se puede acercar
    controls.maxDistance = 6; // Maximo que se puede alejar
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x080808, 1.5);
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

    // for ( let i = 1; i <= 30; i += 2 ) {

    //   const geometry = new THREE.SphereGeometry( i / 30, 48, 24 );

    //   const material = new THREE.MeshLambertMaterial( {

    //     color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
    //     side: THREE.DoubleSide,
    //     clippingPlanes: clipPlanes,
    //     clipIntersection: params.clipIntersection

    //   } );

    //   group.add( new THREE.Mesh( geometry, material ) );

    // }

    // scene.add( group );

    // helpers

    const helpers = new THREE.Group();
    helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000));
    helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00));
    helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff));
    helpers.visible = false;
    scene.add(helpers);

    // gui

    const gui = new GUI();

    gui.add(params, 'clipIntersection').name('clip intersection').onChange(function (value) {

      const children = group.children;

      for (let i = 0; i < children.length; i++) {

        //children[ i ].material.clipIntersection = value;
        children[i].customDepthMaterial.clipIntersection = value;

      }

      this.render();

    });

    gui.add(params, 'planeConstant', - 1, 1).step(0.01).name('plane constant').onChange(function (value) {

      for (let j = 0; j < clipPlanes.length; j++) {

        clipPlanes[j].constant = value;

      }

      this.srender();

    });

    gui.add(params, 'showHelpers').name('show helpers').onChange(function (value) {

      helpers.visible = value;

      this.render();

    });

    //

    window.addEventListener('resize', this.onWindowResize);
    this.render();
  }


  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  render() {
    renderer.render(scene, camera);
  }

}
