import { Component, OnInit } from '@angular/core';
import * as  Stats from "node_modules/stats.js"

@Component({
  selector: 'app-future-voices',
  templateUrl: './future-voices.component.html',
  styleUrls: ['./future-voices.component.scss']
})
export class FutureVoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.init();
    this.step();
  }

  ROWS = 100;
  COLS = 300;
  NUM_PARTICLES = ( ( this.ROWS ) * ( this.COLS ) );
  THICKNESS = Math.pow( 80, 2 );
  SPACING = 3;
  MARGIN = 100;
  COLOR = 220;
  DRAG = 0.95;
  EASE = 0.25;
    
    /*
    
    used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

    B = 4 / Math.PI,
    C = -4 / Math.pow( Math.PI, 2 ),
    P = 0.225,

    */

    container;
    canvas;
    mouse;
    stats;
    list;
    ctx;
    tog;
    man;
    dx; dy;
    mx; my;
    d; t; f;
    a; b;
    i; n;
    w; h;
    p; s;
    r; c;

    particle = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0
    };

  init() {
  
    this.container = document.getElementById('container');
    this.canvas = document.createElement('canvas');
  
    this.ctx = this.canvas.getContext('2d');
    this.man = false;
    this.tog = true;
  
    this.list = [];
  
    this.w = this.canvas.width = this.COLS * this.SPACING + this.MARGIN * 2;
    this.h = this.canvas.height = this.ROWS * this.SPACING + this.MARGIN * 2;
  
    this.container.style.marginLeft = Math.round(this.w * -0.5) + 'px';
    this.container.style.marginTop = Math.round(this.h * -0.5) + 'px';
  
    for (var i = 0; i < this.NUM_PARTICLES; i++) {
  
      this.p = Object.create(this.particle);
      this.p.x = this.p.ox = this.MARGIN + this.SPACING * (i % this.COLS);
      this.p.y = this.p.oy = this.MARGIN + this.SPACING * Math.floor(i / this.COLS);
  
      this.list[i] = this.p;
    }
  
    this.container.addEventListener('mousemove', function (e) {
  
      this.bounds = this.container.getBoundingClientRect();
      this.mx = e.clientX - this.bounds.left;
      this.my = e.clientY - this.bounds.top;
      this.man = true;
  
    });
    if (typeof Stats === 'function') {
      document.body.appendChild((this.stats = new Stats()).domElement);
    }
  
    this.container.appendChild(this.canvas);
  }
  
  step() {
    
    if (this.stats) this.stats.begin();
  
    if (this.tog = !this.tog) {
  
      if (!this.man) {
  
        this.t = +new Date() * 0.001;
        this.mx = this.w * 0.5 + (Math.cos(this.t * 2.1) * Math.cos(this.t * 0.9) * this.w * 0.45);
        this.my = this.h * 0.5 + (Math.sin(this.t * 3.2) * Math.tan(Math.sin(this.t * 0.8)) * this.h * 0.45);
      }
  
      for (var i = 0; i < this.NUM_PARTICLES; i++) {
  
        this.p = this.list[i];
  
        this.d = (this.dx = this.mx - this.p.x) * this.dx + (this.dy = this.my - this.p.y) * this.dy;
        this.f = -this.THICKNESS / this.d;
  
        if (this.d < this.THICKNESS) {
          this.t = Math.atan2(this.dy, this.dx);
          this.p.vx += this.f * Math.cos(this.t);
          this.p.vy += this.f * Math.sin(this.t);
        }
  
        this.p.x += (this.p.vx *= this.DRAG) + (this.p.ox - this.p.x) * this.EASE;
        this.p.y += (this.p.vy *= this.DRAG) + (this.p.oy - this.p.y) * this.EASE;
  
      }
  
    } else {
  
      this.b = (this.a = this.ctx.createImageData(this.w, this.h)).data;
  
      for (i = 0; i < this.NUM_PARTICLES; i++) {
  
        this.p = this.list[i];
        this.b[this.n = (~~this.p.x + (~~this.p.y * this.w)) * 4] = this.b[this.n + 1] = this.b[this.n + 2] = this.COLOR, this.b[this.n + 3] = 255;
      }
  
      this.ctx.putImageData(this.a, 0, 0);
    }
  
    if (this.stats) this.stats.end();
  
    requestAnimationFrame(this.step);
  }

}
