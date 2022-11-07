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

  constructor(private podcastService: PodcastService) {
    this.getPodcastPrincipal();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  getPodcastPrincipal() {
    this.modelService = new GetModel();

    this.modelService.controlador = 'Podcast';
    this.modelService.metodo = 'getData';
    console.log(this.modelService);

    this.podcastService.getAllPodcast(this.modelService).subscribe({
      next: (resp) => {        
        this.podcastPrincipal = resp.data;
        console.log(this.podcastPrincipal);
      },
    });
  }

  eventReproducirPodcast(podcast: string): void {

  }

  getListOfMusic(band:string):void {
    let list = this.podcastPrincipal.filter((item) => {
      return item.name_podcast == band
    });
    this.listBandSelected = list;
  }
}
