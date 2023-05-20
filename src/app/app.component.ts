import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, HostListener, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { NavigationStart, Router } from '@angular/router';
import { AudioObserverService } from './services/audioObserver/audio-observer.service';
import { HelpObserverService } from './services/helpObserver/help-observer.service';
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
  public isMobile = {
    mobilecheck : function() {
      return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor).substr(0,4)))
    }
  };

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
    public audioService : AudioObserverService,
    private helpObserverService: HelpObserverService) {
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
    try {
      this.route.events.subscribe({
        next: (res) => {
          if (res instanceof NavigationStart) {
            let imgBia = document.getElementById('imgBia') as HTMLImageElement;
            let divimgBia = document.getElementById('divimgBia') as HTMLElement;
            switch (res.url) {
              case '/home':
              case '/':
                (this.isMobile.mobilecheck()) ? this.advertenciaContenidos() : null;
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/1. Plataforma principal.mp3";
                  this.videoHelp1 = "(Inicio) Escena 1 Cor.mp4";
                  this.videoHelp2 = "(Inicio) Escena 2 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
                }, 1000);
                break;
              case '/tree-page':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/3. Arte - árbol.mp3";
                  this.videoHelp1 = "(Artes)Escena 5 cor.mp4";
                  this.videoHelp2 = "(Artes) Escena 6 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/(Artes) Gif 3.gif";
                }, 1000);
                break;
              case '/podcast':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/2. Podcast.mp3";
                  this.videoHelp1 = "(Podcast) Escena 3 cor.mp4";
                  this.videoHelp2 = "(Podcast) Escena 4.mp4";
                  imgBia.src = "./assets/img/BIAs/(Podcast) Gif 2.gif";
                }, 1000);
                break;
              case '/virtual-store':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/4. Tienda del futuro.mp3";
                  this.videoHelp1 = "(Tienda) Escena 7 cor.mp4";
                  this.videoHelp2 = "(Tienda) Escena 8 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/(Tienda) GIF 4.gif";
                }, 1000);
                break;
              case '/contents':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/6. Contenidos adicionales.mp3";
                  this.videoHelp1 = "";
                  this.videoHelp2 = "";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
                }, 1000);
                break;
              case '/future-voices':
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/5. Voces del futuro.mp3";
                  this.videoHelp1 = "(Voces) Escena 9 cor.mp4";
                  this.videoHelp2 = "(Voces) Escena 10 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
                }, 1000);
                break;
              default:
                setTimeout(() => {
                  this.audio.nativeElement.src = "./assets/audios/plataforma/1. Plataforma principal.mp3";
                  this.videoHelp1 = "(Inicio) Escena 1.mp4";
                  this.videoHelp2 = "(Inicio) Escena 2 cor.mp4";
                  imgBia.src = "./assets/img/BIAs/BIA01.gif";
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
    $('#imgBia').tooltip({placement: 'left',trigger: 'manual',size:'12px'}).tooltip('show');
    setTimeout(()=>{
      $('#imgBia').tooltip({placement: 'left',trigger: 'manual'}).tooltip('hide');
    },5000);
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
    }).catch(() => {
      this.controlAudio = false;
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
    if(this.textBia == '/contents'){
      window.open("http://aleteotransmedia.com/");
      return;
    }
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
    this.helpObserverService.sendOpenHelp(true);
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
    this.openVideoHelp(1,false); // Abre el primer Vídeo de Ayuda
    document.getElementById('videoHelp').addEventListener('ended',()=>{
      $('#modalVideoHelp').modal('hide');
      this.callAudioPlatform(true); // Activar audio plataforma
    });
  }

  advertenciaContenidos(){
    let orientacionPantalla = window.screen.orientation.type;
      if(!(orientacionPantalla == 'landscape-primary')){
        $('#ModalDeviceLeft').modal('show');
      }
  }
}
