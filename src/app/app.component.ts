import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {

  public flat_open_side: boolean = false;
  public flag = 0;
  public controlPage: string;
  public controlAudio: boolean = true;

  @ViewChild('audioGeneralPage') audio!: ElementRef<HTMLAudioElement>;

  constructor(private spinner: NgxSpinnerService,
    public route: Router) {
  }

  ngAfterContentInit() {
    this.route.events.subscribe((url: any) => {
      if (url.url == '/home') {
        this.spinner.show();
        let time = (window.location.hostname == 'localhost') ? 100 : 8500;
        setTimeout(() => {
          this.spinner.hide();
        }, time);
      }
    });
  }

  ngOnInit(): void {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode))
    try {
      this.route.events.subscribe({
        next: (res) => {
          if (res instanceof NavigationStart) {
            switch (res.url) {
              case '/home':
                setTimeout(() => {
                  this.audio.nativeElement.src = "../assets/audios/plataforma/1. Plataforma principal.mp3";
                }, 1000);
                break;
              case '/tree-page':
                setTimeout(() => {
                  this.audio.nativeElement.src = "../assets/audios/plataforma/3. Arte - árbol.mp3";
                }, 1000);
                break;
              case '/podcast':
                setTimeout(() => {
                  this.audio.nativeElement.src = "../assets/audios/plataforma/2. Podcast.mp3";
                }, 1000);
                break;
              case '/virtual-store':
                setTimeout(() => {
                  this.audio.nativeElement.src = "../assets/audios/plataforma/4. Tienda del futuro.mp3";
                }, 1000);
                break;
              case '/contents':
                setTimeout(() => {
                  this.audio.nativeElement.src = "../assets/audios/plataforma/6. Contenidos adicionales.mp3";
                }, 1000);
                break;
              default:
                setTimeout(() => {
                  this.audio.nativeElement.src = "../assets/audios/plataforma/1. Plataforma principal.mp3";
                }, 1000);
                break;
            }
            let btnAudio = document.getElementById('btnStartAudio') as HTMLAudioElement;
            btnAudio.click();
          }
        }
      });

    } catch (error) {
      console.log(error);
    }

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
      console.log('play correct');
    }).catch(() => {
      console.log('play error');
    });
  }

  playPauseAudio() {
    if (this.controlAudio) {
      this.audio.nativeElement.pause();
      document.getElementsByClassName('divAudioIcon')[0].classList.add('audioIconStop');
    } else {
      this.audio.nativeElement.play();
      document.getElementsByClassName('divAudioIcon')[0].classList.remove('audioIconStop');
    }
    this.controlAudio = !this.controlAudio;
  }
}
