import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalContentsComponent } from './additional-contents/additional-contents.component';
import { AleteoHomeComponent } from './aleteo-home/aleteo-home.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ThreePagesComponent } from './three-pages/three-pages.component';
import { VirtualStoreComponent } from './virtual-store/virtual-store.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AleteoHomeComponent
  },
  {
    path: 'tree-page',
    component: ThreePagesComponent
  },
  {
    path: 'podcast',
    component: PodcastComponent
  },
  {
    path: 'virtual-store',
    component: VirtualStoreComponent
  },
  {
    path: 'contents',
    component: AdditionalContentsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
