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

  public principalSong: string = '../../../assets/audios/forever.mp3';

  public nameBand: string;

  constructor() { 
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['listPodCast']?.currentValue) {
      this.filterPrincipalSong();
    }
  }

  
  ngOnInit(): void {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
  }

  ngAfterViewInit(): void {
    this.source = this.ctx.createMediaElementSource(this.audioReproducto.nativeElement);
  }

  eventPlay(): void {
    let audio = this.audioReproducto.nativeElement;
    let btnN = this.btn.nativeElement;
    if (audio.paused) {
      audio.play();
      btnN.classList.add('btn-pause');
      btnN.classList.remove('btn-play');
      //this.ctx.resume();
      this.onPlay();
    } else {
      audio.pause();
      btnN.classList.add('btn-play');
      btnN.classList.remove('btn-pause');
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
      this.playContainer.nativeElement.style.backgroundImage = 'url(./../../../assets/img/foo.jpg)';

      this.eventPlay();

  }

  filterPrincipalSong() {
    let song = this.listPodCast?.filter((item) => {
      
      return item.principal == 1;
    });
    this.nameBand = song[0].name_podcast;
    this.audioReproducto.nativeElement.src = song[0].url_cancion;
  }
}
