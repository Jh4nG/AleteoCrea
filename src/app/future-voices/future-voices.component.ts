import { Component, OnInit } from '@angular/core';
import * as  Stats from "node_modules/stats.js"
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
declare var $; 

@Component({
  selector: 'app-future-voices',
  templateUrl: './future-voices.component.html',
  styleUrls: ['./future-voices.component.scss']
})
export class FutureVoicesComponent implements OnInit {

  ROWS = (screen.width > 1280) ? 170 : 150; // height
  COLS = 320; // width
  // ROWS = 0.20833333333333334 * screen.height;
  // COLS = 0.25 * screen.width;
  NUM_PARTICLES = ( ( this.ROWS ) * ( this.COLS ) );
  THICKNESS = Math.pow( 80, 2 ); // radio del circulo
  SPACING = (screen.width > 1280) ? 6 : 4; // espacios entre circulos
  MARGIN = 0; // Margen en el recuadro del canvas
  COLOR = 225; // color de partículas 
  DRAG = 0.95; // tiempo en que se re arman las partículas (no tocar)
  EASE = 0.25; // Margen del margen
  container;
  canvas;
  mouse;
  stats;
  list = [];
  ctx;
  tog = true;
  man = false; // Inicializa el movimiento principal (false -> inicia, true -> no inicia)
  dx; dy;
  mx; my;
  d; t; f;
  a; b;
  i; n;
  w;
  h;
  p; s;
  r; c;

  particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
  };

  mediaRecorder : any;
  fragmentosDeAudio : any;

  constructor() { }

  ngOnInit(): void {
    this.init();
    setInterval(()=>{
      this.step();
    });
  }
  
  init() {  
    this.container = document.getElementById('container');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    
    this.canvas.width = this.container.offsetWidth ;
    this.canvas.height = this.container.offsetHeight - 7;
    // this.canvas.setAttribute('style','width:100%;height:100vh');
    this.w = this.COLS * this.SPACING + this.MARGIN * 2; 
    this.h =  this.ROWS * this.SPACING + this.MARGIN * 2;

    // this.container.style.marginLeft = Math.round(this.w * -0.5) + 'px';
    // this.container.style.marginTop = Math.round(this.h * -0.5) + 'px';
  
    for (var i = 0; i < this.NUM_PARTICLES; i++) {
  
      this.p = Object.create(this.particle);
      this.p.x = this.p.ox = this.MARGIN + this.SPACING * (i % this.COLS);
      this.p.y = this.p.oy = this.MARGIN + this.SPACING * Math.floor(i / this.COLS);
  
      this.list[i] = this.p;
    }
    if (typeof Stats === 'function') {
      // document.body.appendChild((this.stats = new Stats()).domElement);
    }
  
    this.container.appendChild(this.canvas);
  }
  
  step() {

    // if (this.stats) this.stats.begin();

    if (this.tog = !this.tog) {
  
      if (!this.man) {
  
        this.t = +new Date() * 0.001;
        this.mx = this.w * 0.5 + (Math.cos(this.t * 2.1) * Math.cos(this.t * 0.9) * this.w * 0.45);
        this.my = this.h * 0.5 + (Math.sin(this.t * 3.2) * Math.tan(Math.sin(this.t * 0.8)) * this.h * 0.45);
      }
  
      for (var i = 0; i < this.NUM_PARTICLES; i++) {
  
        this.p = this.list[i];
  
        this.d = (this.dx = this.mx - this.p.x) * this.dx + (this.dy = this.my - this.p.y) * this.dy;
        this.f = -this.THICKNESS / this.d;
  
        if (this.d < this.THICKNESS) {
          this.t = Math.atan2(this.dy, this.dx);
          this.p.vx += this.f * Math.cos(this.t);
          this.p.vy += this.f * Math.sin(this.t);
        }
  
        this.p.x += (this.p.vx *= this.DRAG) + (this.p.ox - this.p.x) * this.EASE;
        this.p.y += (this.p.vy *= this.DRAG) + (this.p.oy - this.p.y) * this.EASE;
  
      }
  
    } else {
  
      this.b = (this.a = this.ctx.createImageData(this.w, this.h)).data;
  
      for (i = 0; i < this.NUM_PARTICLES; i++) {
  
        this.p = this.list[i];
        this.b[this.n = (~~this.p.x + (~~this.p.y * this.w)) * 4] = this.b[this.n + 1] = this.b[this.n + 2] = this.COLOR, this.b[this.n + 3] = 255;
      }
  
      this.ctx.putImageData(this.a, 0, 0);
    }
  }

  eventoParticulas(e){
    let bounds = this.container.getBoundingClientRect();
    this.mx = e.clientX - bounds.left;
    this.my = e.clientY - bounds.top;
    this.man = true;
  }

  startRecording(type){
    let recording = document.getElementById('divRecording') as HTMLElement;
    let start = document.getElementById('divRecordingStart') as HTMLElement;
    recording.setAttribute('style','display:none');
    start.setAttribute('style','display:none');
    if(type){// Empieza a grabar
      start.setAttribute('style','display:block');
      $('#modalTratamientoDatos').modal('hide');
      $('.modal-backdrop.fade.show').remove();

      navigator.mediaDevices.getUserMedia({
          audio: {
              deviceId: '',
          }
      })
      .then(
        stream => {
          // Comenzar a grabar con el stream
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.fragmentosDeAudio = [];
          // Escuchar cuando haya datos disponibles
          this.mediaRecorder.addEventListener("dataavailable", evento => {
            // Y agregarlos a los fragmentos
              this.fragmentosDeAudio.push(evento.data);
          });

          this.mediaRecorder.addEventListener("stop", () => {
            // Detener el stream
            stream.getTracks().forEach(track => track.stop());
            // Detener la cuenta regresiva
            // Convertir los fragmentos a un objeto binario
            const blobAudio = new Blob(this.fragmentosDeAudio);

            // Crear una URL o enlace para descargar
            const urlParaDescargar = URL.createObjectURL(blobAudio);
            // Crear un elemento <a> invisible para descargar el audio
            let a = document.createElement("a") as HTMLElement;
            document.body.appendChild(a);
            a.setAttribute('style' , "display: none");
            a.setAttribute('href', urlParaDescargar);
            a.setAttribute('download', "grabacion_parzibyte.me.webm");
            // Hacer click en el enlace
            a.click();
            // Y remover el objeto
            window.URL.revokeObjectURL(urlParaDescargar);
          });
        }
      )
      .catch(error => {
          // Aquí maneja el error, tal vez no dieron permiso
          console.log(error);
      });
    }else{ // para grabación
      if (!this.mediaRecorder) alert("No se está grabando");
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
      recording.setAttribute('style','display:block');
    }
  }

}
