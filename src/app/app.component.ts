import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, HostListener, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { NavigationStart, Router } from '@angular/router';
import { AudioObserverService } from './services/audioObserver/audio-observer.service';
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {

  public statusStart: boolean = true;

  public flat_open_side: boolean = false;
  public flag = 0;
  public controlPage: string;
  public controlAudio: boolean = true;
  public controlAudioUser: boolean = true;
  public controlAudioFirts: boolean = false;
  public controlVideo: boolean = false;
  public viewHelp = true;
  public videoHelp1 = "";
  public videoHelp2 = "";
  public textBia;
  @ViewChild('audioGeneralPage') audio!: ElementRef<HTMLAudioElement>;
  private mousemove = new EventEmitter<MouseEvent>();

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if(!this.controlAudioFirts){
      if(!this.controlVideo){
        this.startAudioPlatform();
      }
    }
  }

  constructor(private spinner: NgxSpinnerService,
    public route: Router,
    public audioService : AudioObserverService) {

    window.addEventListener('load', (event) => {
      // this.route.events.subscribe((url: any) => {
      //   if (url instanceof NavigationStart) {
      //     if (url.url == '/home') {
      //       this.spinner.show('spinnerInicio');
      //       let time = (window.location.hostname == 'localhost') ? 100 : 8500;
      //       setTimeout(() => {
      //         this.spinner.hide('spinnerInicio');
      //       }, time);
      //     }else{
      //       this.spinner.show('spinnerMariposa');
      //       setTimeout(() => {
      //         this.spinner.hide('spinnerMariposa');
      //       }, 2000);
      //     }
      //   }
      // });
    });
    this.audioService.getChangeMusicPlatform().subscribe(
      {
        next : (resp) => {
          this.callAudioPlatform(resp);
        }
      }
    );
  }

  ngAfterContentInit() {
    this.route.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        this.textBia = url.url;
        if (url.url == '/home' || url.url == '/') {
          let statusAleteo = localStorage.getItem('AleteoMuseoInteractivo');
          let time = (window.location.hostname == 'localhost') ? 4500 : 4500;
          this.spinner.show('spinnerInicio');
          if(statusAleteo == null){
            setTimeout(() => {
              this.statusStart = false;
            }, time);
            localStorage.setItem('AleteoMuseoInteractivo', 'Primer Ingreso plataforma');
            this.videoHelp1 = "(Inicio) Escena 1 Cor.mp4";
          } 
          setTimeout(() => {
            this.spinner.hide('spinnerInicio');
          }, time);
          // this.textBia = "¿En qué puedo ayudarlo?";
        }else{
          this.spinner.show('spinnerMariposa');
          setTimeout(() => {
            this.spinner.hide('spinnerMariposa');
          }, 2000);
        }
      }
    });
  }

  ngOnInit(): void {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode));
    try {
      this.route.events.subscribe({
        next: (res) => {
          if (res instanceof NavigationStart) {
            let imgBia = document.getElementById('imgBia') as HTMLImageElement;
            let divimgBia = document.getElementById('divimgBia') as HTMLElement;
            switch (res.url) {
              case '/home':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/1. Plataforma principal.mp3";
                  this.videoHelp1 = "(Inicio) Escena 1 Cor.mp4";
                  this.videoHelp2 = "(Inicio) Escena 2 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
                  // this.textBia = "¿En qué puedo ayudarlo?";
                }, 1000);
                break;
              case '/tree-page':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/3. Arte - árbol.mp3";
                  this.videoHelp1 = "(Artes)Escena 5 cor.mp4";
                  this.videoHelp2 = "(Artes) Escena 6 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/(Artes) Gif 3.gif";
                  // this.textBia = "Me encuentro a su servicio";
                }, 1000);
                break;
              case '/podcast':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/2. Podcast.mp3";
                  this.videoHelp1 = "(Podcast) Escena 3 cor.mp4";
                  this.videoHelp2 = "(Podcast) Escena 4.mp4";
                  imgBia.src = "./assets/img/BIAs/(Podcast) Gif 2.gif";
                  // this.textBia = "Escúcheme, le seré útil…";
                }, 1000);
                break;
              case '/virtual-store':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/4. Tienda del futuro.mp3";
                  this.videoHelp1 = "(Tienda) Escena 7 cor.mp4";
                  this.videoHelp2 = "(Tienda) Escena 8 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/(Tienda) GIF 4.gif";
                  // this.textBia = "Estoy a disposición de la ignorancia";
                }, 1000);
                break;
              case '/contents':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/6. Contenidos adicionales.mp3";
                  this.videoHelp1 = "";
                  this.videoHelp2 = "";
                  divimgBia.style.display = 'none';
                }, 1000);
                break;
              case '/future-voices':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/5. Voces del futuro.mp3";
                  this.videoHelp1 = "(Voces) Escena 9 cor.mp4";
                  this.videoHelp2 = "(Voces) Escena 10 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
                  // this.textBia = "Mi voz podrá guiarlo";
                }, 1000);
                break;
              default:
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/1. Plataforma principal.mp3";
                  this.videoHelp1 = "(Inicio) Escena 1.mp4";
                  this.videoHelp2 = "(Inicio) Escena 2 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
                  this.textBia = "¿En qué puedo ayudarlo?";
                  // divimgBia.style.display = 'none';
                }, 1000);
                break;
            }
            let btnAudio = document.getElementById('btnStartAudio') as HTMLAudioElement;
            btnAudio.click();
            if(res.url != '/contents'){
              setTimeout(()=>{
                this.showHelpTooltip();
              },2000);
              setInterval(()=>{
                this.showHelpTooltip();
              },35000);
            }
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  showHelpTooltip(){ // muestra el mensaje de ayuda cada 35 segundo (cuenta los 5 segundos activos)
    $('#imgBia').tooltip({placement: 'bottom',trigger: 'manual'}).tooltip('show');
    setTimeout(()=>{
      $('#imgBia').tooltip({placement: 'bottom',trigger: 'manual'}).tooltip('hide');
    },5000);
  }

  shareFunction() {
    const left = 96;
    const position = 90;
    let home = document.querySelector('.home') as HTMLElement;
    let one = document.querySelector('.one') as HTMLElement;
    let two = document.querySelector('.two') as HTMLElement;
    let three = document.querySelector('.three') as HTMLElement;
    let four = document.querySelector('.four') as HTMLElement;
    if (this.flag == 0) {
      home.animate({
        top: `${position - 9}%`,
        left: `${left + 2}%`,
      }, 100);
      setTimeout(() => {
        home.style.top = `${position - 9}%`;
        home.style.left = `${left + 2}%`;
      }, 110);

      one.animate({
        top: `${position - 10}%`,
        left: `${left - 1}%`,
      }, 200);
      setTimeout(() => {
        one.style.top = `${position - 10}%`;
        one.style.left = `${left - 1}%`;
      }, 210);

      setTimeout(() => {
        two.animate({
          top: `${position - 7}%`,
          left: `${left - 4}%`
        }, 200);
        setTimeout(() => {
          two.style.top = `${position - 7}%`;
          two.style.left = `${left - 4}%`;
        }, 210);
      }, 200);

      setTimeout(() => {
        three.animate({
          top: `${position - 0.5}%`,
          left: `${left - 5}%`
        }, 200);
        setTimeout(() => {
          three.style.top = `${position - 0.5}%`;
          three.style.left = `${left - 5}%`;
        }, 210);
      }, 300);

      setTimeout(() => {
        four.animate({
          top: `${position + 6}%`,
          left: `${left - 4}%`
        }, 200);
        setTimeout(() => {
          four.style.top = `${position + 6}%`;
          four.style.left = `${left - 4}%`;
        }, 210);
      }, 400);
      this.flag = 1;

    } else {
      home.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      one.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      two.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      three.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      four.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);

      setTimeout(() => {
        home.style.top = `${position + 1}%`;
        home.style.left = `${left}%`;
        one.style.top = `${position + 1}%`;
        one.style.left = `${left}%`;
        two.style.top = `${position + 1}%`;
        two.style.left = `${left}%`;
        three.style.top = `${position + 1}%`;
        three.style.left = `${left}%`;
        four.style.top = `${position + 1}%`;
        four.style.left = `${left}%`;
      }, 200);
      this.flag = 0;
    }
  }

  showSideBar(action: boolean) {
    if (action) {
      this.flat_open_side = true
    } else {
      this.flat_open_side = false
    }
  }

  startAudioPlatform() {
    this.audio.nativeElement.autoplay = true;
    this.audio.nativeElement.loop = true;
    this.audio.nativeElement.play().then(() => {
      document.getElementsByClassName('divAudioIcon')[0].classList.remove('audioIconStop');
      this.controlAudioFirts = !this.controlAudioFirts;
      this.controlAudio = true;
      // console.log('play correct');
    }).catch(() => {
      this.controlAudio = false;
      // console.log('play error');
    });
  }

  playPauseAudio(type:boolean = true) {
    if(type){
      this.controlAudioUser = !this.controlAudioUser;
    }
    if (this.controlAudio) {
      this.audio.nativeElement.pause();
      document.getElementsByClassName('divAudioIcon')[0].classList.add('audioIconStop');
    } else {
      this.audio.nativeElement.play();
      document.getElementsByClassName('divAudioIcon')[0].classList.remove('audioIconStop');
    }
    this.controlAudio = !this.controlAudio;
  }

  openViewHelp() {
    if (this.viewHelp) {
      $('.btnFirtsHelp').fadeIn(1000);
      $('.btnSecondHelp').fadeIn(1000);
    } else {
      $('.btnFirtsHelp').fadeOut(1000);
      $('.btnSecondHelp').fadeOut(1000);
    }
    this.viewHelp = !this.viewHelp;
  }

  openVideoHelp(type: number, process : boolean = true) {
    let video = document.getElementById("videoHelp") as HTMLVideoElement;
    video.src = "";
    if (type == 1) { // Ayuda uno
      video.src = "./assets/VideoHelp/" + this.videoHelp1;
      video.play().then(() => {
        console.log('Reproducir vídeo correctamente');
      }).catch(() => {
        console.log('Error al reproducir vídeo');
      });
      video.volume = 0.7;
    } else { // Ayuda 2
      video.src = "./assets/VideoHelp/" + this.videoHelp2;
      video.play();
      video.volume = 0.7;
    }
    this.callAudioPlatform(false); // Silenciar audio plataforma
    this.controlVideo = true;
    $('#modalVideoHelp').modal('show');
    if(process){
      this.openViewHelp();
    }
  }

  stopVideoModalHepl() {
    let video = document.getElementById("videoHelp") as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
    this.callAudioPlatform(true); // Activar audio plataforma
    this.controlVideo = false;
  }

  callAudioPlatform(resp : boolean){
    if(resp == false){ // debería pausar
      if(this.controlAudio){
        this.playPauseAudio(false);
      }
    }else{ // lo debería activar
      if(this.controlAudio == false){
        if(this.controlAudioUser){
          this.playPauseAudio(false);
        }
      }
    }
  }

  startVideoHelp($event){
    this.statusStart = $event;
    // let video = document.getElementById("videoHelp") as HTMLVideoElement;
    // video.play();
    this.openVideoHelp(1,false); // Abre el primer Vídeo de Ayuda
    document.getElementById('videoHelp').addEventListener('ended',()=>{
      $('#modalVideoHelp').modal('hide');
      this.callAudioPlatform(true); // Activar audio plataforma
    });
  }
}
