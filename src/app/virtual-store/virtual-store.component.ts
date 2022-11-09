import { Component, OnDestroy, OnInit } from '@angular/core';
import { Viewer } from 'photo-sphere-viewer'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import { GyroscopePlugin } from "photo-sphere-viewer/dist/plugins/gyroscope";
import { VisibleRangePlugin } from "photo-sphere-viewer/dist/plugins/visible-range";
import { HttpClient } from '@angular/common/http';
declare var $;

@Component({
  selector: 'app-virtual-store',
  templateUrl: './virtual-store.component.html',
  styleUrls: ['./virtual-store.component.scss']
})
export class VirtualStoreComponent implements OnInit, OnDestroy {

  estratoSelected = "1";
  viewer: Viewer;
  animatedValues = {
    latitude : { start: -Math.PI / 2, end: 0.2 },
    longitude: { start: Math.PI, end: 0 },
    zoom     : { start: 0, end: 50 },
    fisheye  : { start: 2, end: 0 },
  };
  configInit = {
    longitude : { 
      "1" : 1.9, // Alto
      "2" : 1, // Medio
      "3" : 1 // Bajo
    }
  }
  soundProduct : boolean;

  constructor(private http: HttpClient) { }
  
  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    // setTimeout(()=>{
    //   let btn = document.getElementById('btnModalPrincipal');
    //   btn.click();
    // },500);
    this.ngSubmitForm();
  }
  
  constructViwer(){
    let json = "";
    let panorama = "";
    switch(this.estratoSelected){
      case '1': // Alto
          json = "../assets/jsonStore/alto.json";
          panorama = "../assets/img/store/Estratos/ALTO.jpg";
        break;
      case '2': // Medio
          json = "../assets/jsonStore/medio.json";
          panorama = "../assets/img/store/Estratos/MEDIO.jpg";
        break;
      case '3': // Bajo
          json = "../assets/jsonStore/bajo.json";
          panorama = "../assets/img/store/Estratos/BAJO.jpg";
        break;
      default:
          json = "../assets/jsonStore/alto.json";
          panorama = "../assets/img/store/Estratos/ALTO.jpg";
        break;
    }
    this.http.get(json).subscribe(data=>{
      this.viewer = new Viewer({
        container: document.querySelector('#viewer') as HTMLCanvasElement,
        panorama: panorama,
        loadingImg: '../assets/img/Cargando_Gif.gif',
        navbar: 'caption description',
        caption : 'Museo Interactivo',
        defaultLong: this.configInit.longitude[this.estratoSelected],
        plugins: [
          [ MarkersPlugin, 
            {
              markers: data
            }
          ]
        ]
      });
      const markersPlugin = this.viewer.getPlugin(MarkersPlugin);
      markersPlugin.on("select-marker", (e, marker) => {
        this.getProductModal(marker);
      });
    });
  }

  getProductModal(marker : any){
    this.soundProduct = false;
    let c = marker.config;
    let path = "../assets/img/store/OBJETOS/";
    $('#nameProduct').html(c.nameProduct);
    $('#modalProduct').modal('show');
    $('#btnAddCard').attr('data-id',marker.id);
    let soundProduct = document.getElementById('soundProduct') as HTMLAudioElement;
    soundProduct.src = `${path}${c.folder}/${c.soundProduct}`;
    soundProduct.play().then(()=>{
      $('#btnSoundProduct i').removeClass('fa-play');
      $('#btnSoundProduct i').addClass('fa-pause');
      this.soundProduct = true;
    }).catch(()=>{
      $('#btnSoundProduct i').addClass('fa-play');
      $('#btnSoundProduct i').removeClass('fa-pause');
      this.soundProduct = false;
    });
    setTimeout(()=>{
      $('#imgFirstProduct').attr('src',`${path}${c.folder}/${c.images[0]}`).addClass('animate__animated animate__fadeInDown');
      $('#imgSecondProduct').attr('src',`${path}${c.folder}/${c.images[1]}`).addClass('animate__animated animate__fadeInDown animate__delay-1s');
      $('#imgThridProduct').attr('src',`${path}${c.folder}/${c.images[2]}`).addClass('animate__animated animate__fadeInDown animate__delay-2s');
    },100);
  }

  startStopSoundProduct(){
    let soundProduct = document.getElementById('soundProduct') as HTMLAudioElement;
    if(this.soundProduct){
      $('#btnSoundProduct i').addClass('fa-play');
      $('#btnSoundProduct i').removeClass('fa-pause');
      soundProduct.pause();
    }else{
      $('#btnSoundProduct i').removeClass('fa-play');
      $('#btnSoundProduct i').addClass('fa-pause');
      soundProduct.play();
    }
    this.soundProduct = !this.soundProduct;
  }

  eventCloseModalProduct(){
    let soundProduct = document.getElementById('soundProduct') as HTMLAudioElement;
    soundProduct.pause();
    soundProduct.currentTime = 0;
  }
  
  ngSubmitForm(){
    $('#modalVirtualStore').modal('hide');
    $('.modal-backdrop.fade.show').remove();
    this.constructViwer();
  }

  selectOption(e, type : number){
    switch(type){
      case 1: // First Question
        $('.btnFirst').removeClass('btnSelected');
        e.currentTarget.setAttribute('class', 'btnFirst btnSelected');
        this.estratoSelected = e.currentTarget.getAttribute('data-value');
        $('.firstQuestion').fadeOut(()=>{
          $('.secondsQuestion').fadeIn(1000);
        });
      break;
      case 2: // Second Question
        $('.btnSecond').removeClass('btnSelected');
        e.currentTarget.setAttribute('class', 'btnSecond btnSelected');
        $('.secondsQuestion').fadeOut(()=>{
          $('.thirdQuestion').fadeIn(1000);
        });
      break;
      case 3: // Third Question
        $('.btnThird').removeClass('btnSelected');
        e.currentTarget.setAttribute('class', 'btnThird btnSelected');
        this.ngSubmitForm();
      break;
    }
  }

  retroceder(type : number){
    switch(type){
      case 1: // Retroceder primer pregunta
        $('.secondsQuestion').fadeOut(()=>{
          $('.firstQuestion').fadeIn(1000);
        });
      break;
      case 2: // Retroceder segunda pregunta
        $('.thirdQuestion').fadeOut(()=>{
          $('.secondsQuestion').fadeIn(1000);
        });
      break;
    }
  }
}
