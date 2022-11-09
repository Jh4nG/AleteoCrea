import { Component, OnDestroy, OnInit } from '@angular/core';
declare var $;
import { PodcastService } from '../services/podcast.service';
import { GetModel } from '../models/getModel';

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

  constructor(private podcastService: PodcastService) {
    this.getPodcastPrincipal();
    
  }

  ngOnInit(): void {
    this.elementAudio = document.getElementById('podcastAudios') as HTMLAudioElement;
    console.log(this.elementAudio);
    
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
    if (podcast == this.lastPodcast) {
      
      if (this.elementAudio.paused) {
        console.log('Puta');
        switch (podcast) {
          case 1:
            this.elementAudio.src = '../../assets/audios/podcast/Cap 1 - Archivo de BIa 235.mp3';
            this.elementAudio.play();
            break;
          case 2:
            this.elementAudio.src = '../../assets/audios/podcast/Cap 2 - Archivo de BIA 531.mp3';
            this.elementAudio.play();
            break;
          case 3:
            this.elementAudio.src = '../../assets/audios/podcast/Cap 3 - Archivo de BIA 134.mp3';
            this.elementAudio.play();
            break;
          case 4:
            this.elementAudio.src = '../../assets/audios/podcast/Cap 4 - Archivo de BIA 112.mp3';
            this.elementAudio.play();
            break;
          case 5:
            this.elementAudio.src = '../../assets/audios/podcast/Cap 5 - Archivo de BIA 1041.mp3';
            this.elementAudio.play();
            break;
          case 6:
    
            break;
          case 7:
    
            break;
          case 8:
    
            break;
          case 9:
    
            break;
        }
      } else {
        console.log('Mierda');
        this.elementAudio.pause();
      }
      this.lastPodcast = podcast;
    } else {
      switch (podcast) {
        case 1:
          this.elementAudio.src = '../../assets/audios/podcast/Cap 1 - Archivo de BIa 235.mp3';
          this.elementAudio.play();
          break;
        case 2:
          this.elementAudio.src = '../../assets/audios/podcast/Cap 2 - Archivo de BIA 531.mp3';
          this.elementAudio.play();
          break;
        case 3:
          this.elementAudio.src = '../../assets/audios/podcast/Cap 3 - Archivo de BIA 134.mp3';
          this.elementAudio.play();
          break;
        case 4:
          this.elementAudio.src = '../../assets/audios/podcast/Cap 4 - Archivo de BIA 112.mp3';
          this.elementAudio.play();
          break;
        case 5:
          this.elementAudio.src = '../../assets/audios/podcast/Cap 5 - Archivo de BIA 1041.mp3';
          this.elementAudio.play();
          break;
        case 6:
  
          break;
        case 7:
  
          break;
        case 8:
  
          break;
        case 9:
  
          break;
      }
      this.lastPodcast = podcast;
    }
    
    
    
  }

  getListOfMusic(band: string): void {
    let list = this.podcastPrincipal.filter((item) => {
      return item.name_podcast == band
    });
    this.listBandSelected = list;
  }
}
