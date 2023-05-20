import { Component, OnDestroy, OnInit } from '@angular/core';
declare var $;
import { PodcastService } from '../services/podcast.service';
import { GetModel } from '../models/getModel';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { AudioObserverService } from '../services/audioObserver/audio-observer.service';
import { HelpObserverService } from '../services/helpObserver/help-observer.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent implements OnInit, OnDestroy {

  public modelService: GetModel;

  public podcastPrincipal: Array<any>;

  public listBandSelected: Array<any>;

  public elementAudio: HTMLAudioElement;

  public lastPodcast: number = 0;

  public closeModal: boolean = false;

  public changeItem: any;

  constructor(private podcastService: PodcastService,
    private audioService: AudioObserverService,
    private helpService: HelpObserverService) {
    this.getPodcastPrincipal();
  }

  ngOnInit(): void {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode))

    this.elementAudio = document.getElementById('podcastAudios') as HTMLAudioElement;
    this.elementAudio.pause();

    this.helpService.getStatusHelp().subscribe({
      next: (resp) => {
               
        this.elementAudio.pause();
      }
    });
    if(!(window.location.hostname == 'localhost')){
      this.podcastService.getIPAddress().subscribe((res:any)=>{  
        let ipAddress = res.ip;
        this.podcastService.setVisitador(ipAddress,'Podcast').subscribe(resp =>{
          if(resp.status == 200){
            console.log(`Éxito: ${resp.msg}`);
          }else{
            console.log(`Error: ${resp.msg}`);
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  getPodcastPrincipal() {
    this.modelService = new GetModel();

    this.modelService.controlador = 'Podcast';
    this.modelService.metodo = 'getData';
    this.podcastService.getAllPodcast(this.modelService).subscribe({
      next: (resp) => {
        this.podcastPrincipal = resp.data;
      },
    });
  }

  eventReproducirPodcast(podcast: number): void {
    this.silenceAudio();

    if (podcast == this.lastPodcast) {     
      if (this.elementAudio.paused) {
        let element;
        let img;
        switch (podcast) {
          case 1:
            element = document.querySelector('.podcast-1');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');

            this.elementAudio.src = '../../assets/audios/podcast/Cap 1 - Archivo de BIa 235.mp3';
            break;
          case 2:
            element = document.querySelector('.podcast-2');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 2 - Archivo de BIA 531.mp3';
            break;
          case 3:
            element = document.querySelector('.podcast-3');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 3 - Archivo de BIA 134.mp3';
            break;
          case 4:
            element = document.querySelector('.podcast-4');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 4 - Archivo de BIA 112.mp3';
            break;
          case 5:
            element = document.querySelector('.podcast-5');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 5 - Archivo de BIA 1041.mp3';
            break;
          case 6:
            element = document.querySelector('.podcast-6');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 6 - Archivo de BIA 998.mp3';
            break;
          case 7:
            element = document.querySelector('.podcast-7');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 7 - Archivo de BIA 475.mp3';
            break;
          case 8:
            element = document.querySelector('.podcast-8');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 8 - Archivo BIA 385.mp3';
            break;
          case 9:
            element = document.querySelector('.podcast-9');
            img = element.lastChild.lastChild as HTMLElement;
            img.classList.add('img-change-size');
            this.elementAudio.src = '../../assets/audios/podcast/Cap 9 - Presente el devenir.mp3';
            break;
        }
        this.elementAudio.play();      
      } else {
        this.elementAudio.pause();
      }
      this.lastPodcast = podcast;
    } else {
      let element;
      let img;
      switch (podcast) {
        case 1:
          element = document.querySelector('.podcast-1');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 1 - Archivo de BIa 235.mp3';
          break;
        case 2:
          element = document.querySelector('.podcast-2');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 2 - Archivo de BIA 531.mp3';
          break;
        case 3:
          element = document.querySelector('.podcast-3');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 3 - Archivo de BIA 134.mp3';
          break;
        case 4:
          element = document.querySelector('.podcast-4');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 4 - Archivo de BIA 112.mp3';
          break;
        case 5:
          element = document.querySelector('.podcast-5');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 5 - Archivo de BIA 1041.mp3';
          break;
        case 6:
          element = document.querySelector('.podcast-6');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 6 - Archivo de BIA 998.mp3';
          break;
        case 7:
          element = document.querySelector('.podcast-7');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 7 - Archivo de BIA 475.mp3';
          break;
        case 8:
          element = document.querySelector('.podcast-8');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 8 - Archivo BIA 385.mp3';
          break;
        case 9:
          element = document.querySelector('.podcast-9');
          img = element.lastChild.lastChild as HTMLElement;
          img.classList.add('img-change-size');
          this.elementAudio.src = '../../assets/audios/podcast/Cap 9 - Presente el devenir.mp3';
          break;
      }
      this.elementAudio.play();
      this.lastPodcast = podcast;
    }

  }

  getListOfMusic(band: string): void {
    this.elementAudio.pause();
    let list = this.podcastPrincipal.filter((item) => {
      return item.name_podcast == band
    });
    this.listBandSelected = list;
    this.silenceAudio();
  }

  eventoCerrado() {
    this.closeModal = true;
    setTimeout(() => {
      this.closeModal = false;
    }, 200);
  }

  silenceAudio() {
    this.audioService.sendChangeMusicPlatform(false);
    this.elementAudio.pause();
  }

  activeAudio() {
    this.audioService.sendChangeMusicPlatform(true);
  }
}
