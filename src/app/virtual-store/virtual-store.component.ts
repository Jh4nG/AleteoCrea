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
      loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
      plugins: [
        [Viewer.MarkersPlugin, {
          // list of markers
          markers: [{
            id       : 'custom-tooltip',
            tooltip  : {
              content  : `
    <img src="https://photo-sphere-viewer-data.netlify.app/assets/sphere-small.jpg">
    <article>
      <h2>Lorem ipsum</h2>
      <p>
        Vivamus magna. Cras in mi at felis aliquet
        congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
        tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
      </p>
    </article>`,
              className: 'custom-tooltip',
              trigger  : 'click',
            },
            latitude : 0.11,
            longitude: -0.35,
            image    : 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
            width    : 32,
            height   : 32,
            anchor   : 'bottom center',
          }]
        }]
      ]
    });
  }
}
