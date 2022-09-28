import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreePagesComponent } from './three-pages/three-pages.component';
import { PodcastComponent } from './podcast/podcast.component';
import { AleteoHomeComponent } from './aleteo-home/aleteo-home.component';
import { VirtualStoreComponent } from './virtual-store/virtual-store.component';
import { AdditionalContentsComponent } from './additional-contents/additional-contents.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgParticlesModule } from 'ng-particles';
import  { NgxSpinnerModule  } from 'ngx-spinner';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ReproductorComponentComponent } from './components/reproductor-component/reproductor-component.component';
import { FutureVoicesComponent } from './future-voices/future-voices.component';

@NgModule({
  declarations: [
    AppComponent,
    AleteoHomeComponent,
    PodcastComponent,
    ThreePagesComponent,
    VirtualStoreComponent,
    AdditionalContentsComponent,
    ModalComponentComponent,
    ReproductorComponentComponent,
    FutureVoicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgParticlesModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
