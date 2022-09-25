import { Component, OnInit } from '@angular/core';
import {
  MoveDirection,
  ClickMode,
  HoverMode,
  OutMode,
  Container,
  Engine,
} from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
declare var $;
import { PodcastService } from '../services/podcast.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent implements OnInit {
  podcastPrincipal : any;
  public id = 'tsparticles';
  playerTrack = $('#player-track');
  bgArtwork = $('#bg-artwork');
  bgArtworkUrl;
  albumName = $('#album-name');
  trackName = $('#track-name');
  albumArt = $('#album-art');
  sArea = $('#s-area');
  seekBar = $('#seek-bar');
  trackTime = $('#track-time');
  insTime = $('#ins-time');
  sHover = $('#s-hover');
  playPauseButton = $('#play-pause-button');
  i = this.playPauseButton.find('i');
  tProgress = $('#current-time');
  tTime = $('#track-length');
  seekT;
  seekLoc;
  seekBarPos;
  cM;
  ctMinutes;
  ctSeconds;
  curMinutes;
  curSeconds;
  durMinutes;
  durSeconds;
  playProgress;
  bTime;
  audio = new Audio();
  nTime = 0;
  buffInterval = null;
  tFlag = false;
  albums = ['Dawn', 'Me & You', 'Electro Boy', 'Home', 'Proxy (Original Mix)'];
  trackNames = [
    'Skylike - Dawn',
    'Alex Skrindo - Me & You',
    'Kaaze - Electro Boy',
    'Jordan Schor - Home',
    'Martin Garrix - Proxy',
  ];
  albumArtworks = ['_1', '_2', '_3', '_4', '_5'];
  trackUrl = [
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
  ];
  playPreviousTrackButton = $('#play-previous');
  playNextTrackButton = $('#play-next');
  currIndex = -1;

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  public particlesUrl = 'http://foo.bar/particles.json';

  constructor(private podcastService: PodcastService) {
    this.getPodcastPrincipal();
  }

  /* or the classic JavaScript object */
  // particlesOptions = {
  //   background: {
  //     color: "#000"
  //   },
  //   fpsLimit: 120,
  //   interactivity: {
  //     events: {
  //       // onClick: {
  //       //   enable: true,
  //       //   mode: ClickMode.push
  //       // },
  //       onHover: {
  //         enable: true,
  //         mode: HoverMode.repulse
  //       },
  //       resize: true
  //     },
  //     modes: {
  //       push: {
  //         // quantity: 4
  //       },
  //       repulse: {
  //         distance: 200,
  //         // duration: 0.4
  //       }
  //     }
  //   },
  //   particles: {
  //     color: {
  //       value: "#ffffff"
  //     },
  //     links: {
  //       color: "#ffffff",
  //       distance: 150,
  //       enable: true,
  //       opacity: 0.5,
  //       width: 1
  //     },
  //     collisions: {
  //       enable: false
  //     },
  //     move: {
  //       direction: MoveDirection.none,
  //       enable: true,
  //       outModes: {
  //         default: OutMode.out
  //       },
  //       random: false,
  //       speed: 4,
  //       straight: false
  //     },
  //     number: {
  //       density: {
  //         enable: true,
  //         area: 800
  //       },
  //       value: 50
  //     },
  //     opacity: {
  //       value: 0.5
  //     },
  //     shape: {
  //       type: "circle"
  //     },
  //     size: {
  //       value: { min: 1, max: 5 },
  //     }
  //   },
  //   detectRetina: false
  // };

  /** Mariposa en SVG */
  particlesOptions = {
    fpsLimit: 120,
    background: {
      color: {
        value: '#000000',
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    fullScreen: {
      zIndex: 1,
    },
    detectRetina: false,
    interactivity: {
      events: {
        onClick: {
          mode: 'push',
        },
        onDiv: {
          selectors: '#repulse-div',
          mode: 'repulse',
        },
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        slow: {
          factor: 1,
          radius: 0,
        },
        attract: {
          distance: 200,
          duration: 0.4,
          easing: 'ease-out-quad',
          factor: 1,
          maxSpeed: 50,
          speed: 1,
        },
        bounce: {
          distance: 200,
        },
        bubble: {
          distance: 40,
          duration: 2,
          mix: false,
          opacity: 8,
          size: 6,
          divs: {
            distance: 200,
            duration: 0.4,
            mix: false,
            selectors: [],
          },
        },
        connect: {
          distance: 80,
          links: {
            opacity: 0.5,
          },
          radius: 60,
        },
        grab: {
          distance: 400,
          links: {
            blink: false,
            consent: false,
            opacity: 1,
          },
        },
        push: {
          default: true,
          groups: [],
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: 'ease-out-quad',
          divs: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: 'ease-out-quad',
            selectors: [],
          },
        },
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1,
        },
        light: {
          area: {
            gradient: {
              start: {
                value: '#ffffff',
              },
              stop: {
                value: '#000000',
              },
            },
            radius: 1000,
          },
          shadow: {
            color: {
              value: '#000000',
            },
            length: 2000,
          },
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        speed: 1,
      },
      number: {
        density: {
          area: 2000,
        },
        value: 200,
      },
      opacity: {
        value: {
          min: 0.05,
          max: 0.4,
        },
        animation: {
          enable: true,
          minimumValue: 0.05,
        },
      },
      size: {
        random: true,
        value: 1,
        animation: {
          speed: 40,
          minimumValue: 0.1,
        },
      },
      life: {
        count: 0,
        delay: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          sync: false,
        },
        duration: {
          random: {
            enable: false,
            minimumValue: 0.0001,
          },
          value: 0,
          sync: false,
        },
      },
      roll: {
        darken: {
          enable: false,
          value: 0,
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0,
        },
        mode: 'vertical',
        speed: 25,
      },
      tilt: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          decay: 0,
          sync: false,
        },
        direction: 'clockwise',
        enable: false,
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
      },
      wobble: {
        distance: 5,
        enable: false,
        speed: {
          angle: 50,
          move: 10,
        },
      },
      orbit: {
        animation: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          sync: false,
        },
        enable: false,
        opacity: 1,
        rotation: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 45,
        },
        width: 1,
      },
      links: {
        blink: false,
        color: {
          value: '#ffffff',
        },
        consent: false,
        distance: 30,
        enable: true,
        frequency: 1,
        opacity: 0.4,
        shadow: {
          blur: 5,
          color: {
            value: '#000',
          },
          enable: false,
        },
        triangles: {
          enable: false,
          frequency: 1,
        },
        width: 1,
        warp: false,
      },
      repulse: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        enabled: false,
        distance: 1,
        duration: 1,
        factor: 1,
        speed: 1,
      },
    },
    polygon: {
      draw: {
        enable: true,
        stroke: {
          color: {
            value: 'rgba(255,255,255,0.2)',
          },
          width: 1,
          opacity: 0.2,
        },
      },
      enable: true,
      inlineArrangement: 'equidistant',
      inline: {
        arrangement: "one-per-point"
      },
      move: {
        radius: 10,
        type: 'path',
      },
      scale: 0.7,
      type: 'inline',
      // url: "../assets/img/podcast/monarca.svg",
      // url: 'https://particles.js.org/images/smalldeer.svg',
      url: '../assets/img/podcast/smalldeer.svg',
      // position: '50% 50%',
    },
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size

    await loadFull(engine);

    // setTimeout(()=>{
    //   loadFull(engine);
    // },1000)
  }

  ngOnInit(): void {
    this.audio = new Audio();
    this.selectTrack(0);
    this.audio.loop = false;
    this.playPauseButton.on('click', this.playPause);
    this.sArea.mousemove(function (event) {
      this.showHover(event);
    });

    this.sArea.mouseout(this.hideHover);
    this.sArea.on('click', this.playFromClickedPos);
    $(this.audio).on('timeupdate', this.updateCurrTime);
    this.playPreviousTrackButton.on('click', function () {
      this.selectTrack(-1);
    });
    this.playNextTrackButton.on('click', function () {
      this.selectTrack(1);
    });
  }

  playPause() {
    // setTimeout(function () {
    if (this.audio.paused) {
      // debugger
      $('#player-track').addClass('active');
      $('#album-art').addClass('active');
      this.checkBuffering();
      this.i.attr('class', 'fas fa-pause');
      this.audio.play();
    } else {
      $('#player-track').removeClass('active');
      $('#album-art').removeClass('active');
      clearInterval(this.buffInterval);
      $('#album-art').removeClass('buffering');
      this.i.attr('class', 'fas fa-play');
      this.audio.pause();
    }
    // }, 300);
  }

  showHover(event) {
    this.seekBarPos = this.sArea.offset();
    this.seekT = event.clientX - this.seekBarPos.left;
    this.seekLoc = this.audio.duration * (this.seekT / this.sArea.outerWidth());

    this.sHover.width(this.seekT);

    this.cM = this.seekLoc / 60;

    this.ctMinutes = Math.floor(this.cM);
    this.ctSeconds = Math.floor(this.seekLoc - this.ctMinutes * 60);

    if (this.ctMinutes < 0 || this.ctSeconds < 0) return;

    if (this.ctMinutes < 0 || this.ctSeconds < 0) return;

    if (this.ctMinutes < 10) this.ctMinutes = '0' + this.ctMinutes;
    if (this.ctSeconds < 10) this.ctSeconds = '0' + this.ctSeconds;

    if (isNaN(this.ctMinutes) || isNaN(this.ctSeconds))
      this.insTime.text('--:--');
    else this.insTime.text(this.ctMinutes + ':' + this.ctSeconds);

    this.insTime.css({ left: this.seekT, 'margin-left': '-21px' }).fadeIn(0);
  }

  hideHover() {
    this.sHover.width(0);
    this.insTime
      .text('00:00')
      .css({ left: '0px', 'margin-left': '0px' })
      .fadeOut(0);
  }

  playFromClickedPos() {
    this.audio.currentTime = this.seekLoc;
    this.seekBar.width(this.seekT);
    this.hideHover();
  }

  updateCurrTime() {
    var nTime = new Date();
    this.nTime = nTime.getTime();

    if (!this.tFlag) {
      this.tFlag = true;
      this.trackTime.addClass('active');
    }

    this.curMinutes = Math.floor(this.audio.currentTime / 60);
    this.curSeconds = Math.floor(this.audio.currentTime - this.curMinutes * 60);

    this.durMinutes = Math.floor(this.audio.duration / 60);
    this.durSeconds = Math.floor(this.audio.duration - this.durMinutes * 60);

    this.playProgress = (this.audio.currentTime / this.audio.duration) * 100;

    if (this.curMinutes < 10) this.curMinutes = '0' + this.curMinutes;
    if (this.curSeconds < 10) this.curSeconds = '0' + this.curSeconds;

    if (this.durMinutes < 10) this.durMinutes = '0' + this.durMinutes;
    if (this.durSeconds < 10) this.durSeconds = '0' + this.durSeconds;

    if (isNaN(this.curMinutes) || isNaN(this.curSeconds))
      this.tProgress.text('00:00');
    else this.tProgress.text(this.curMinutes + ':' + this.curSeconds);

    if (isNaN(this.durMinutes) || isNaN(this.durSeconds))
      this.tTime.text('00:00');
    else this.tTime.text(this.durMinutes + ':' + this.durSeconds);

    if (
      isNaN(this.curMinutes) ||
      isNaN(this.curSeconds) ||
      isNaN(this.durMinutes) ||
      isNaN(this.durSeconds)
    )
      this.trackTime.removeClass('active');
    else this.trackTime.addClass('active');

    this.seekBar.width(this.playProgress + '%');

    if (this.playProgress == 100) {
      this.i.attr('class', 'fa fa-play');
      this.seekBar.width(0);
      this.tProgress.text('00:00');
      $('#album-art').removeClass('buffering').removeClass('active');
      clearInterval(this.buffInterval);
    }
  }

  checkBuffering() {
    clearInterval(this.buffInterval);
    this.buffInterval = setInterval(function () {
      if (this.nTime == 0 || this.bTime - this.nTime > 1000)
        $('#album-art').addClass('buffering');
      $('#album-art').removeClass('buffering');

      this.bTime = new Date();
      this.bTime = this.bTime.getTime();
    }, 100);
  }

  selectTrack(flag) {
    if (flag == 0 || flag == 1) ++this.currIndex;
    else --this.currIndex;

    if (this.currIndex > -1 && this.currIndex < this.albumArtworks.length) {
      if (flag == 0) this.i.attr('class', 'fa fa-play');
      else {
        $('#album-art').removeClass('buffering');
        this.i.attr('class', 'fa fa-pause');
      }

      this.seekBar.width(0);
      this.trackTime.removeClass('active');
      this.tProgress.text('00:00');
      this.tTime.text('00:00');

      var currAlbum = this.albums[this.currIndex];
      var currTrackName = this.trackNames[this.currIndex];
      var currArtwork = this.albumArtworks[this.currIndex];

      this.audio.src = this.trackUrl[this.currIndex];

      this.nTime = 0;
      this.bTime = new Date();
      this.bTime = this.bTime.getTime();

      if (flag != 0) {
        this.audio.play();
        this.playerTrack.addClass('active');
        $('#album-art').addClass('active');

        clearInterval(this.buffInterval);
        this.checkBuffering();
      }

      this.albumName.text(currAlbum);
      this.trackName.text(currTrackName);
      $('#album-art').find('img.active').removeClass('active');
      $('#' + currArtwork).addClass('active');

      this.bgArtworkUrl = $('#' + currArtwork).attr('src');

      this.bgArtwork.css({
        'background-image': 'url(' + this.bgArtworkUrl + ')',
      });
    } else {
      if (flag == 0 || flag == 1) --this.currIndex;
      else ++this.currIndex;
    }
  }

  getPodcastPrincipal() {
    this.podcastService.getAllPodcast().subscribe({
      next: (resp) => { // Data de podcast
        this.podcastPrincipal = resp;
      },
    });
  }

  
}
