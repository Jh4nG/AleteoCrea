import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Collapse from 'bootstrap/js/dist/collapse';
declare var $;

@Component({
  selector: 'app-reproductor-component',
  templateUrl: './reproductor-component.component.html',
  styleUrls: ['./reproductor-component.component.scss']
})
export class ReproductorComponentComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() listPodCast: any;

  @ViewChild('btn') btn!: ElementRef;

  @ViewChild('audioContainer') audioReproducto!: ElementRef;

  @ViewChild('visualizerBox') visualizer!: ElementRef;

  @ViewChild('playAudio') playContainer!: ElementRef;

  public ctx = new window.AudioContext();

  public analyser = this.ctx.createAnalyser();

  public source;

  public bufferLength;

  public dataArray;

  public elements = [];

  public collapse: Collapse;

  public principalSong: string = '';

  public nameBand: string;

  @Input() modalClose: boolean = false;

  constructor() {


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listPodCast']?.currentValue) {

      this.filterPrincipalSong();
    }

    if (changes['modalClose']?.currentValue) {
      let audio = this.audioReproducto.nativeElement;
      this.eventPlay();
      audio.pause();

    }
  }


  ngOnInit(): void {
    this.modalClose = true;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  }

  ngAfterViewInit(): void {
    this.source = this.ctx.createMediaElementSource(this.audioReproducto.nativeElement);
  }

  eventPlay(): void {
    let audio = this.audioReproducto.nativeElement;
    let btnN = this.btn.nativeElement;
    // console.log(audio.paused);

    if (audio.paused) {
      btnN.classList.add('btn-pause');
      btnN.classList.remove('btn-play');
      //this.ctx.resume();
      audio.play();
      this.onPlay();
    } else {
      btnN.classList.add('btn-play');
      btnN.classList.remove('btn-pause');
      audio.pause();
    }
  }

  onPlay(): void {

    this.source.connect(this.analyser);
    this.source.connect(this.ctx.destination);
    this.analyser.fftSize = 64;
    this.bufferLength = this.analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(this.bufferLength);
    for (let i = 0; i < this.bufferLength; i++) {
      const element = document.createElement('span');
      element.classList.add('style-buffer');
      element.setAttribute('style', `position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 10px;
      border-top: 40px solid #fff;
      border-right: 20px solid transparent;
      border-left: 20px solid transparent;
      transform-origin: top left;
      transition: .25s;`);
      this.elements.push(element);
      this.visualizer.nativeElement.appendChild(element);
    }

    const update = () => {
      window.requestAnimationFrame(update);
      this.analyser.getByteFrequencyData(this.dataArray);

      for (let i = 0; i < this.bufferLength; i++) {
        let item = this.dataArray[i];
        item = item > 150 ? item / 1.5 : item * 1.5;
        this.elements[i].style.transform = `rotateZ(${i * (360 / this.bufferLength)}deg) translate(-50%,${this.clamps(item, 100, 150)}px)`;
      }
    }

    update();
  }

  clamps(num, min, max) {
    if (num >= max) {
      return max;
    }
    if (num <= min) {
      return min;
    }
    return num;
  }

  eventChangeSong(cancion: any) {
    this.audioReproducto.nativeElement.src = cancion.url_cancion;
    let img = `url(${cancion.url_img})`;
    this.playContainer.nativeElement.style.backgroundImage = img;
    let audio = this.audioReproducto.nativeElement;
    audio.pause();
    this.eventPlay();
  }

  filterPrincipalSong() {
    let song = this.listPodCast?.filter((item) => {
      // console.log(this.listPodCast);

      return item.principal == 1;
    });
    this.nameBand = song[0].name_podcast;
    this.audioReproducto.nativeElement.src = song[0].url_cancion;

    try {
      switch (song[0].name_podcast) {
        case 'Los inestables':
          this.playContainer.nativeElement.classList.remove('apocalipsis', 'fragor');
          this.playContainer.nativeElement.classList.add('inestables');
          break;
        case 'Apocalipsis Now Milton Rural':
          this.playContainer.nativeElement.classList.remove('inestables', 'fragor');
          this.playContainer.nativeElement.classList.add('apocalipsis');
          break;
        case 'Fragor Raizal':
          this.playContainer.nativeElement.classList.remove('inestables', 'apocalipsis');
          this.playContainer.nativeElement.classList.add('fragor');
          break;
          default:
          this.playContainer.nativeElement.classList.remove('inestables', 'apocalipsis', 'fragor');
          let img = `url(${song[0].url_img})`;
          this.playContainer.nativeElement.style.backgroundImage = img;
          break;
      }

    } catch (error) {
      // console.log(error);
    }
  }

  clickItem(item: number) {
    let itemsLi = document.querySelectorAll('.item-selected');

    itemsLi.forEach((itemL) => {
      if (itemL.id !== item.toString()) {
        itemL.setAttribute('style', 'display: none;')
      } else {
        itemL.setAttribute('style', 'display: inline;')
      }
    });
  }
}
