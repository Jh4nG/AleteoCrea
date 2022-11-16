import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AudioObserverService } from './../services/audioObserver/audio-observer.service';
declare var $;
@Component({
  selector: 'app-additional-contents',
  templateUrl: './additional-contents.component.html',
  styleUrls: ['./additional-contents.component.scss']
})
export class AdditionalContentsComponent implements OnInit, OnDestroy, AfterContentInit {

  videoActualSrc : any = "";
  spinerMariposa = "MariposaSpinner";
  constructor(private spinner: NgxSpinnerService,
    public audioService : AudioObserverService) { }

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngAfterContentInit(): void {
    // this.spinner.show(this.spinerMariposa);
    // setTimeout(()=>{
    //   this.spinner.hide(this.spinerMariposa);
    // },4000);
  }

  ngOnInit(): void {
  }

  openViewContent(content){
    let video = document.getElementById('videoContentAdd') as HTMLVideoElement;
    let name = document.getElementById('nameVideo') as HTMLElement;
    switch(content){
      case 'aleteo':
        this.videoActualSrc = "../../assets/img/contentsAdd/Videos/¿Qué es Aleteo-.mp4";
        // name.innerHTML = "aleteo";
        break;
      case 'bia':
        this.videoActualSrc = "../../assets/img/contentsAdd/Videos/BIA.mp4";
        // name.innerHTML = "bia";
        break;
      case 'camila':
        this.videoActualSrc = "../../assets/img/contentsAdd/Videos/Camila.mp4";
        // name.innerHTML = "camila";
        break;
      case 'museo':
        this.videoActualSrc = "../../assets/img/contentsAdd/Videos/Museo Interactivo.mp4";
        // name.innerHTML = "museo interavtivo";
        break;
    }
    video.src = this.videoActualSrc;
    video.play();
    video.volume = 0.7;
    this.audioService.sendChangeMusicPlatform(false); // silenciar audio plataforma
    $('#modalContentAdd').modal('show');
  }

  eventCloseModalContentAdd(){
    let video = document.getElementById('videoContentAdd') as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
    video.src = "";
    this.audioService.sendChangeMusicPlatform(true); // activar audio plataforma
  }

}
