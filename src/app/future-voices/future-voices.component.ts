import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as  Stats from "node_modules/stats.js"
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { PodcastService } from '../services/podcast.service';
import * as moment from 'moment';
import { AudioObserverService } from './../services/audioObserver/audio-observer.service';
declare var $; 
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-future-voices',
  templateUrl: './future-voices.component.html',
  styleUrls: ['./future-voices.component.scss']
})
export class FutureVoicesComponent implements OnInit, OnDestroy {

  meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  dataVoiceFuture : any;
  idAudioActual = 0;
  timeRecording = "";
  timeActual = "00:00";
  timeTranscurridoActualString = "00:00";
  timeTranscurridoActual = 0;
  inter : any;
  intervalParticle : any;
  public open_side_voice: boolean = false;
  idFrame; 
  listadoCanciones = [];
  icono = {
          'pausa' : 'fa-pause', 
          'reproducir' : 'fa-play',
          'volumenSilenciado' : 'fa fa-volume-off',
          'volumenBajo' : 'fa fa-volume-down',
          'volumenAlto' : 'fa fa-volume-up'
        }; 
  uris = {musica: 'Musica/', caratula: 'Caratulas/'}; reproduciendo = 0;
  cancion = {
    audio: new Audio(),
    URI: '',
    caratula:'',
    duracion:{
      minutos : "",
      segundos : ""
    }
  };
  reproductor = {
    nodo: document.querySelector('.reproductor'),
    duracion: document.querySelector('.reproduccion__progreso time') as HTMLElement,
    caratula: document.querySelector('.cancion__caratula img'),
    deslizador: [],
    boton: []
  };
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
  base64String : any;

  constructor(public service : PodcastService,
    public audioService : AudioObserverService) { }

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.init();
    this.intervalParticle = setInterval(()=>{
      this.step();
    });
    this.getVoiceUsers();
  }

  convetirFecha(fecha){
    var fecha = fecha.split('-').reverse();
    fecha[1] = this.meses[Number(fecha[1]-1)].substr(0,3);
    return fecha.join('-');
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

  openModal(){
    $('#modalTratamientoDatos').modal('show');
    this.showSideBarVoice(false);
  }

  startRecording(type){
    let recording = document.getElementById('divRecording') as HTMLElement;
    let start = document.getElementById('divRecordingStart') as HTMLElement;
    recording.setAttribute('style','display:none');
    start.setAttribute('style','display:none');
    $('[name="inpNameUser"]').val('');
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
          this.audioService.sendChangeMusicPlatform(false); // silenciar audio plataforma
          let d = new Date().toLocaleTimeString(); // tiempo inicio grabación
          // Comenzar a grabar con el stream
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.fragmentosDeAudio = [];
          // Escuchar cuando haya datos disponibles
          this.mediaRecorder.addEventListener("dataavailable", evento => {
            // Y agregarlos a los fragmentos
            this.fragmentosDeAudio.push(evento.data);
          });
          
          let recognition = new webkitSpeechRecognition();
          recognition.lang = "es-CO";
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.start();
          recognition.addEventListener('result', (e) => {
            this.man = false;
            if(e.results[0].isFinal){
              this.man = true;
              recognition.abort();
              setTimeout(()=>{
                recognition.start();
              },500);
            }
          });

          this.mediaRecorder.addEventListener("stop", () => {
            // Detener el stream
            stream.getTracks().forEach(track => track.stop());
            let d2 = new Date().toLocaleTimeString();
            let da = moment(d, 'hh:mm:ss');
            let da2 = moment(d2, 'hh:mm:ss');
            var seconds = moment.duration(da2.diff(da)).asSeconds();
            var minute = (seconds/60).toString().split('.');
            var minutes = Number.parseInt(minute[0]);
            seconds = seconds - (minutes * 60);
            this.timeRecording = `${(minutes < 10) ? '0'+minutes : minutes}:${(seconds<10) ? '0'+seconds : seconds}`;
            setTimeout(()=>{
              this.man = true;
              recognition.abort();
              recognition.stop();
            },3000);
            $('#modalConfirmVoice').modal('show');
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

  confirmRecording(type : boolean){
    try {
      if(type){
        $('#modalConfirmVoice').modal('hide');
        // Convertir los fragmentos a un objeto binario
        const blobAudio = new Blob(this.fragmentosDeAudio);
        const reader = new FileReader();
        reader.readAsDataURL(blobAudio);
        reader.addEventListener('loadend', (event) => { 
          const audio = reader.result as String;
          let name = ($('[name="inpNameUser"]').val() != '') ? $('[name="inpNameUser"]').val() : 'Anónimo';
          this.service.savePodcast(name,audio.replace('data:application/octet-stream;base64,',''),this.timeRecording).subscribe(
            resp =>{
              let txt = "";
              if(resp.status == 200){
                txt = `Audio grabado correctamente.
                <br><br>
                Gracias por dejar su voz del futuro. Recuerde que puede escuchar su audio y el de otros usuarios clickeando en el botón (<i class="fa fa-list"></i>) que está en la parte izquierda inferior.`;
                this.audioService.sendChangeMusicPlatform(true); // silenciar audio plataforma
              }else{  
                txt = `Error al grabar audio.
                <br><br>
                Ha ocurrido un arror al grabar el audio, por favor intente nuevamente.`;
              }
              $('#txtConfirmAudio').html(txt);
              $('#modalConfirm').modal('show');
              this.getVoiceUsers();
            }
          );
        });
      }else{
        this.timeRecording = "";
        this.fragmentosDeAudio = [];
      }
    } catch (error) {
      let txt = "";
      txt = `Error al grabar audio.
                <br><br>
                Ha ocurrido un arror al grabar el audio, por favor intente nuevamente.`;
      $('#txtConfirmAudio').html(txt);
      $('#modalConfirm').modal('show');
    }
  }

  showSideBarVoice(action: boolean) {
    if(action){
      this.open_side_voice = true
    } else {
      this.open_side_voice = false
    }
  }

  getVoiceUsers(){
    this.service.getPodcast().subscribe(
      resp =>{
        if(resp.status == 200){
          this.dataVoiceFuture = resp.data;
          this.setValueAudio(0);
        }else{
          console.log('No se a podido cargar voces del futuro');
        }
      }
    );
  }

  setValueAudio(id : any){
    this.timeActual = this.dataVoiceFuture[id].time_audio;
    let audio = document.getElementById('audioVoiceActual') as HTMLAudioElement;
    audio.src = this.dataVoiceFuture[id].url_podcast;
  }

  iniciarReproductor(){
    this.audioService.sendChangeMusicPlatform(false); // silenciar audio plataforma
    let audio = document.getElementById('audioVoiceActual') as HTMLAudioElement;
    audio.play();
    document.querySelector('.controles__reproduccion button i.fa.fa-play').parentElement.setAttribute('style','display:none');
    document.querySelector('.controles__reproduccion button i.fa.fa-pause').parentElement.setAttribute('style','');
    document.querySelector('.controles__reproduccion button i.fa.fa-stop').parentElement.setAttribute('style','');
    this.contadorTime();
  }

  contadorTime(){
    let tmpTimeAudio : any = this.timeActual.split(':');
    tmpTimeAudio = (Number.parseInt(tmpTimeAudio[0]) * 60) + tmpTimeAudio[1]; 
    this.inter = setInterval(()=>{
      if(tmpTimeAudio <= this.timeTranscurridoActual){ // Detener intervalo
        this.stopReproductor();
        return;
      }
      this.timeTranscurridoActual++;
      var minute = (this.timeTranscurridoActual/60).toString().split('.');
      var minutes = Number.parseInt(minute[0]);
      var seconds = this.timeTranscurridoActual - (minutes * 60);
      this.timeTranscurridoActualString = `${(minutes < 10) ? '0'+minutes : minutes}:${(seconds<10) ? '0'+seconds : seconds}`;
    },1000);
  }

  changeAudio(id : any){
    $('.nav-link.nav-voice-future').removeClass('active');
    if(id == '+'){
      if((this.dataVoiceFuture.length-1) == this.idAudioActual){
        this.idAudioActual = 0;
      }else{
        this.idAudioActual++;
      }
      id = this.idAudioActual;
    }else if(id == '-'){
      if(this.idAudioActual == 0){
        this.idAudioActual = this.dataVoiceFuture.length-1;
      }else{
        this.idAudioActual--;
      }
      id = this.idAudioActual;
    }else{
      this.idAudioActual = id;
    }
    $(`.divVoice${id}`).addClass('active');
    this.stopReproductor();
    this.setValueAudio(id);
    this.iniciarReproductor();
  }

  pauseReproductor(){
    this.audioService.sendChangeMusicPlatform(true); // activar audio plataforma
    let audio = document.getElementById('audioVoiceActual') as HTMLAudioElement;
    audio.pause();
    document.querySelector('.controles__reproduccion button i.fa.fa-play').parentElement.setAttribute('style','');
    document.querySelector('.controles__reproduccion button i.fa.fa-pause').parentElement.setAttribute('style','display:none');
    document.querySelector('.controles__reproduccion button i.fa.fa-stop').parentElement.setAttribute('style','display:none');
    clearInterval(this.inter);
  }

  stopReproductor(){
    this.audioService.sendChangeMusicPlatform(true); // activar audio plataforma
    let audio = document.getElementById('audioVoiceActual') as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
    this.timeTranscurridoActual = 0;
    this.timeTranscurridoActualString = '00:00';
    document.querySelector('.controles__reproduccion button i.fa.fa-play').parentElement.setAttribute('style','');
    document.querySelector('.controles__reproduccion button i.fa.fa-pause').parentElement.setAttribute('style','display:none');
    document.querySelector('.controles__reproduccion button i.fa.fa-stop').parentElement.setAttribute('style','display:none');
    clearInterval(this.inter);
  }

  alternarDeslizadorVolumen(e){
    e.stopPropagation();
    let input = document.querySelector('.controles__volumen input');
    let button = document.querySelector('.controles__volumen button');
    if(e.target == button || e.target == button.firstChild){
      input.classList.toggle('oculto');
    } else {
      input.classList.add('oculto');
    }
  }

  moverVolumen(e){
    let volumen = e.target.value;

    let audio = document.getElementById('audioVoiceActual') as HTMLAudioElement;
    audio.volume = volumen/100;
    let button = document.querySelector('.controles__volumen button');

    let iconoVolumen = button.querySelector('i');

    if(volumen == 0) iconoVolumen.className = this.icono['volumenSilenciado'];
    else if(volumen <= 50) iconoVolumen.className = this.icono['volumenBajo'];
    else iconoVolumen.className = this.icono['volumenAlto'];
  }
}
