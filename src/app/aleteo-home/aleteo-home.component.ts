import { Component, OnInit } from '@angular/core';
declare var $; 

@Component({
  selector: 'app-aleteo-home',
  templateUrl: './aleteo-home.component.html',
  styleUrls: ['./aleteo-home.component.scss']
})
export class AleteoHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.img-agua').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.01,
      // imageUrl : '../../assets/img/agua.jpg'
    });
    $('.imgMariposa').tilt({
      glare: true,
      maxGlare: .5,
      axis: "x"
    });
  }
}
