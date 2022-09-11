import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Tooltip } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public flat_open_side:boolean = false;
  public flag=0;
  
  constructor(private spinner: NgxSpinnerService) {}
  
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },1000);
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode))
  }

  
  shareFunction(){
    const left = 96;
    const position = 90;
    let one = document.querySelector('.one') as HTMLElement;
    let two = document.querySelector('.two') as HTMLElement;
    let three = document.querySelector('.three') as HTMLElement;
    let four = document.querySelector('.four') as HTMLElement;
    if (this.flag == 0) {
      one.animate({
        top: `${position-10}%`,
        left: `${left+2}%`,
      }, 200);
      setTimeout(() => {
        one.style.top = `${position-10}%`;
        one.style.left = `${left+2}%`;
      },210);

      setTimeout(() => {
        two.animate({
          top: `${position-9}%`,
          left: `${left-2}%`
        }, 200);
        setTimeout(() => {
          two.style.top = `${position-9}%`;
          two.style.left = `${left-2}%`;
        },210);
      },200);

      setTimeout(() => {
        three.animate({
          top: `${position-3}%`,
          left: `${left-5}%`
        }, 200);
        setTimeout(() => {
          three.style.top = `${position-3}%`;
          three.style.left = `${left-5}%`;
        },210);
      },300);

      setTimeout(() => {
        four.animate({
          top: `${position+6}%`,
          left: `${left-5}%`
        }, 200);
        setTimeout(() => {
          four.style.top = `${position+6}%`;
          four.style.left = `${left-5}%`;
        },210);
      },400);
      this.flag = 1;
    
    } else {
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
      imgSound.style.left = '3%';
      this.flat_open_side = true
    }else{
      imgSound.style.left = '0%';
      this.flat_open_side = false
    }
  }
  
}
