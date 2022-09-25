import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterContentInit {
  public flat_open_side:boolean = false;
  public flag=0;
  public audioCont:boolean = true;  
  
  constructor(private spinner: NgxSpinnerService,
              private route : Router) {}
  
  ngAfterContentInit(){
    this.route.events.subscribe((url:any) => {
      if(url.url == '/home'){
        this.spinner.show();
        setTimeout(()=>{
          this.spinner.hide();
        },100);
      }
    });
  }

  ngOnInit(): void {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode))
  }

  
  shareFunction(){
    const left = 96;
    const position = 90;
    let home = document.querySelector('.home') as HTMLElement;
    let one = document.querySelector('.one') as HTMLElement;
    let two = document.querySelector('.two') as HTMLElement;
    let three = document.querySelector('.three') as HTMLElement;
    let four = document.querySelector('.four') as HTMLElement;
    if (this.flag == 0) {
      home.animate({
        top: `${position-9}%`,
        left: `${left+2}%`,
      }, 100);
      setTimeout(() => {
        home.style.top = `${position-9}%`;
        home.style.left = `${left+2}%`;
      },110);

      one.animate({
        top: `${position-10}%`,
        left: `${left-1}%`,
      }, 200);
      setTimeout(() => {
        one.style.top = `${position-10}%`;
        one.style.left = `${left-1}%`;
      },210);

      setTimeout(() => {
        two.animate({
          top: `${position-7}%`,
          left: `${left-4}%`
        }, 200);
        setTimeout(() => {
          two.style.top = `${position-7}%`;
          two.style.left = `${left-4}%`;
        },210);
      },200);

      setTimeout(() => {
        three.animate({
          top: `${position-0.5}%`,
          left: `${left-5}%`
        }, 200);
        setTimeout(() => {
          three.style.top = `${position-0.5}%`;
          three.style.left = `${left-5}%`;
        },210);
      },300);

      setTimeout(() => {
        four.animate({
          top: `${position+6}%`,
          left: `${left-4}%`
        }, 200);
        setTimeout(() => {
          four.style.top = `${position+6}%`;
          four.style.left = `${left-4}%`;
        },210);
      },400);
      this.flag = 1;
    
    } else {
      home.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      one.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      two.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      three.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);
      four.animate({
        top: `${position}%`,
        left: `${left}%`
      }, 200);

      setTimeout(() => {
        home.style.top = `${position+1}%`;
        home.style.left = `${left}%`;
        one.style.top = `${position+1}%`;
        one.style.left = `${left}%`;
        two.style.top = `${position+1}%`;
        two.style.left = `${left}%`;
        three.style.top = `${position+1}%`;
        three.style.left = `${left}%`;
        four.style.top = `${position+1}%`;
        four.style.left = `${left}%`;
      },200);
      this.flag = 0;
    }
  }

  showSideBar(action: boolean) {
    let imgSound = document.getElementById('sonido-botton') as HTMLElement;
    
    if(action){
      imgSound.style.left = '2.5%';
      this.flat_open_side = true
    }else{
      imgSound.style.left = '0%';
      this.flat_open_side = false
    }
  }
  
  starStopAudio(){
    if(this.audioCont){
      let soundBar = document.querySelectorAll('.bar');
      soundBar.forEach((e)=>{
        e.classList.remove('bar');
        e.classList.add('barStop');
      })
      this.audioCont = false;
    }else{
      let soundBar = document.querySelectorAll('.barStop');
      soundBar.forEach((e)=>{
        e.classList.add('bar');
        e.classList.remove('barStop');
      })
      this.audioCont = true;
    }
  }
}
