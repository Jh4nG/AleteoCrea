import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreePagesComponent } from './three-pages/three-pages.component';
import { PodcastComponent } from './podcast/podcast.component';
import { AleteoHomeComponent } from './aleteo-home/aleteo-home.component';
import { VirtualStoreComponent } from './virtual-store/virtual-store.component';
import { AdditionalContentsComponent } from './additional-contents/additional-contents.component';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [
    AppComponent,
    AleteoHomeComponent,
    PodcastComponent,
    ThreePagesComponent,
    VirtualStoreComponent,
    AdditionalContentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
