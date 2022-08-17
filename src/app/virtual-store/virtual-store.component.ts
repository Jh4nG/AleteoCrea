import { Component, OnInit } from '@angular/core';
import { Viewer } from 'photo-sphere-viewer/src/Viewer'

@Component({
  selector: 'app-virtual-store',
  templateUrl: './virtual-store.component.html',
  styleUrls: ['./virtual-store.component.scss']
})
export class VirtualStoreComponent implements OnInit {
  
  viewer : Viewer;
  constructor() { }

  ngOnInit(): void {
    this.viewer = new Viewer({
      container: document.querySelector('#viewer') as HTMLCanvasElement ,
      panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
      defaultLat: -Math.PI / 2,
      defaultLong: Math.PI,
      defaultZoomLvl: 0,
      fisheye: 4,
      navbar: [
        'zoom',
        {
          content: 'Rerun&nbsp;animation',
          onClick: this.intro,
        },
        'caption',
        'fullscreen'
      ]
    });
    this.intro();
  }

  intro(){
    debugger
    // default far plane is too close to render fisheye=4
    // you can also skip this line and start with fisheye=2
    // this.viewer.renderer.camera.far *= 2;

    // new Viewer.utils.Animation({
    //   properties: {
    //     lat: { start: -Math.PI / 2, end: 0.2 },
    //     long: { start: Math.PI, end: 0 },
    //     zoom: { start: 0, end: 50 },
    //     fisheye: { start: 4, end: 0 },
    //   },
    //   duration: 2000,
    //   easing: 'inOutQuad',
    //   onTick: (properties) => {
    //     this.viewer.setOption('fisheye', properties.fisheye);
    //     this.viewer.rotate({ longitude: properties.long, latitude: properties.lat });
    //     this.viewer.zoom(properties.zoom);
    //   }
    // });
  }
}
