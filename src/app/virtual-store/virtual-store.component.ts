import { Component, OnInit } from '@angular/core';
import { Viewer } from 'photo-sphere-viewer'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
declare var $;

@Component({
  selector: 'app-virtual-store',
  templateUrl: './virtual-store.component.html',
  styleUrls: ['./virtual-store.component.scss']
})
export class VirtualStoreComponent implements OnInit {

  viewer: Viewer;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      let btn = document.getElementById('btnModalPrincipal');
      btn.click();
    },500)
  }
  
  constructViwer(){
    this.viewer = new Viewer({
      container: document.querySelector('#viewer') as HTMLCanvasElement,
      panorama: '../assets/img/store/tienda2.jpg',
      // panorama: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
      loadingImg: '../assets/img/mariposa.gif',
      plugins: [
        [ MarkersPlugin, 
          {
          markers: [{
            id: 'custom-tooltip',
            tooltip: {
              content: `
                
                <article>
                  <h2>Lorem ipsum</h2>
                  <p>
                    Vivamus magna. Cras in mi at felis aliquet
                    congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
                    tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
                  </p>
                </article>`,
              className: 'custom-tooltip',
              trigger: 'click',
            },
            latitude: 0.11,
            longitude: -0.35,
            image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
            width: 32,
            height: 32,
            anchor: 'bottom center',
          },
          {
            id: 'custom-tooltip2',
            tooltip: {
              content: `
                
                <article>
                  <h2>Lorem ipsum</h2>
                  <p>
                    Vivamus magna. Cras in mi at felis aliquet
                    congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
                    tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
                  </p>
                </article>`,
              className: 'custom-tooltip2',
              trigger: 'click',
            },
            latitude: 0.35,
            longitude: -0.60,
            image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
            width: 32,
            height: 32,
            anchor: 'bottom center',
          }]
        }]
      ]
    });
  }
  
  ngSubmitForm(){
    $('#modalVirtualStore').modal('hide');
    $('.modal-backdrop.fade.show').remove();
    this.constructViwer();
  }
}
