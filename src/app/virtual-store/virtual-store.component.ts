import { Component, OnDestroy, OnInit } from '@angular/core';
import { Viewer } from 'photo-sphere-viewer'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AudioObserverService } from './../services/audioObserver/audio-observer.service';
declare var $;

@Component({
  selector: 'app-virtual-store',
  templateUrl: './virtual-store.component.html',
  styleUrls: ['./virtual-store.component.scss']
})
export class VirtualStoreComponent implements OnInit, OnDestroy {

  cantidadProductAddCar = 0;
  cantidadDolaresInicial = 0;
  cantidadDolaresGastados = 0;
  estratoSelected = "1";
  productsAddToCar = [];
  viewer: Viewer;
  public open_side_car: boolean = false;
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
  stoExist : any;
  stoAdver : any;
  stoAdd : any;
  spinerMariposa = "MariposaSpinner";

  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    public audioService : AudioObserverService) { }
  
  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    if(window.location.hostname == 'localhost'){
      this.ngSubmitForm();
    }else{
      setTimeout(()=>{
        let btn = document.getElementById('btnModalPrincipal');
        btn.click();
      },500);
    }
  }
  
  constructViwer(){
    let json = "";
    let panorama = "";
    switch(this.estratoSelected){
      case '1': // Alto
          json ="./assets/jsonStore/alto.json";
          panorama ="./assets/img/store/Estratos/ALTO.jpg";
        break;
      case '2': // Medio
          json ="./assets/jsonStore/medio.json";
          panorama ="./assets/img/store/Estratos/MEDIO.jpg";
        break;
      case '3': // Bajo
          json ="./assets/jsonStore/bajo.json";
          panorama ="./assets/img/store/Estratos/BAJO.jpg";
        break;
      default:
          json ="./assets/jsonStore/alto.json";
          panorama ="./assets/img/store/Estratos/ALTO.jpg";
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
        defaultZoomLvl : 4,
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
    $('#alertProductAdd').hide();
    $('#alertProductExist').hide();
    $('#alertProductExcedeLimit').hide();
    let path ="./assets/img/store/OBJETOS/";
    let c = marker.config;
    $('#imgFirstProduct').attr('src',`${path}${c.folder}/${c.images[0]}`);
    $('#imgSecondProduct').attr('src',`${path}${c.folder}/${c.images[1]}`);
    $('#imgThridProduct').attr('src',`${path}${c.folder}/${c.images[2]}`);
    this.showSideBarCar(false);
    this.soundProduct = false;
    $('#nameProduct').html(c.nameProduct);
    $('#btnAddCard').attr('data-id',marker.id);
    $('#btnAddCard').attr('data-name',c.nameProduct);
    $('#btnAddCard').attr('data-price',c.priceInt);
    $('#btnAddCard').attr('data-prices',c.price);
    $('#btnAddCard').attr('data-imgReference',`${path}${c.folder}/${c.images[0]}`);
    $('#btnAddCard').attr('data-caracteristica',c.caracteristica);
    $('#btnAddCard').attr('data-especificaciones',c.especificaciones);
    $('#priceProduct').html(`Precio: ${c.price}`);
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
    this.audioService.sendChangeMusicPlatform(false); // silenciar audio plataforma
    $('#modalProduct').modal('show');
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
    this.audioService.sendChangeMusicPlatform(true); // Activar audio plataforma
  }
  
  ngSubmitForm(){
    $('#modalVirtualStore').modal('hide');
    $('.modal-backdrop.fade.show').remove();
    this.estratoSelected = "1"; // Quitar en prod
    if(window.location.hostname == 'localhost'){
      this.cantidadDolaresInicial = 40000; // Quitar en prod
    }
    this.constructViwer();
  }

  selectOption(e, type : number){
    switch(type){
      case 1: // First Question
        $('.btnFirst').removeClass('btnSelected');
        e.currentTarget.setAttribute('class', 'btnFirst btnSelected');
        this.estratoSelected = e.currentTarget.getAttribute('data-value');
        this.cantidadDolaresInicial = (this.estratoSelected == "1") ? 300000 : (this.estratoSelected == "2") ? 70000 : 12000; // precios iniciales dependiendo del estrato
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

  addtoCar(event){
    let p = event.target.dataset;
    (this.stoExist != undefined) ? clearInterval(this.stoExist) : '';
    (this.stoAdver != undefined) ? clearInterval(this.stoAdver) : '';
    (this.stoAdd != undefined) ? clearInterval(this.stoAdd) : '';
    let exist = this.productsAddToCar.find((item)=>{ return p.id == item.id });
    if(exist != undefined){ // producto ya añadido
      $('#alertProductAdd').fadeOut();
      $('#alertProductExist').removeClass('animate__fadeOutUp').fadeIn().addClass('animate__animated animate__fadeInRight');
      this.stoExist = setTimeout(() => {
        $('#alertProductExist').addClass('animate__animated animate__fadeOutUp').fadeOut();
      }, 3000);
    }else if(this.cantidadDolaresInicial < this.cantidadDolaresGastados + parseInt(p.price)){ // Excede presupuesto
      $('#alertProductAdd').fadeOut();
      $('#alertProductExist').fadeOut();
      $('#alertProductExcedeLimit').removeClass('animate__fadeOutUp').fadeIn().addClass('animate__animated animate__fadeInRight');
      this.stoAdver = setTimeout(() => {
        $('#alertProductExcedeLimit').addClass('animate__animated animate__fadeOutUp').fadeOut();
      }, 3000);
    }else{ // nuevo añadido
      $('#alertProductExist').fadeOut();
      $('#alertProductExcedeLimit').fadeOut();
      $('#alertProductAdd').removeClass('animate__fadeOutUp').fadeIn().addClass('animate__animated animate__fadeInRight');
      this.stoAdd = setTimeout(() => {
        $('#alertProductAdd').addClass('animate__animated animate__fadeOutUp').fadeOut();
      }, 3000);
      this.productsAddToCar.push({"id":p.id,"price":p.price,"priceS":p.prices,"caracteristica":p.caracteristica,"especificaciones":p.especificaciones,"name" : p.name, "imgReference" : p.imgreference});
      this.cantidadDolaresGastados += parseInt(p.price);
      this.cantidadProductAddCar += 1;
    }
  }

  deleteProductCar(id,price){
    this.productsAddToCar = this.removeIdFromCollection(this.productsAddToCar, id);
    this.cantidadDolaresGastados -= price;
    this.cantidadProductAddCar--;
  }

  removeIdFromCollection = (collection, id) => {
    return collection.filter(datum => {
      if (Array.isArray(datum.values)) {
        datum.values = this.removeIdFromCollection(datum.values, id);
      }
      return datum.id !== id;
    });
  }

  showSideBarCar(action: boolean) {
    if(action){
      this.open_side_car = true;
    } else {
      this.open_side_car = false;
    }
  }
}
