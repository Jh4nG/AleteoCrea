import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
declare var $; 

@Component({
  selector: 'app-aleteo-home',
  templateUrl: './aleteo-home.component.html',
  styleUrls: ['./aleteo-home.component.scss']
})
export class AleteoHomeComponent implements OnInit {
  public id = "tsparticles";

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  public particlesUrl = "http://foo.bar/particles.json";

  constructor() { }

  /* or the classic JavaScript object */
  particlesOptions = {
    background: {
      color: {
        value: "#232741"
      },
      position: "50% 50%",
      repeat: "no-repeat",
      size: "20%"
    },
    fullScreen: {
      zIndex: 1
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "repulse"
        },
        onHover: {
          enable: true,
          mode: "bubble"
        }
      },
      modes: {
        attract: {
          distance: 200,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 1,
          maxSpeed: 50,
          speed: 1
        },
        bounce: {
          distance: 200
        },
        bubble: {
          distance: 250,
          duration: 2,
          mix: false,
          opacity: 0,
          size: 0,
          divs: {
            distance: 200,
            duration: 0.4,
            mix: false,
            selectors: []
          }
        },
        connect: {
          distance: 80,
          links: {
            opacity: 0.5
          },
          radius: 60
        },
        grab: {
          distance: 400,
          links: {
            blink: false,
            consent: false,
            opacity: 1
          }
        },
        push: {
          default: true,
          groups: [],
          quantity: 4
        },
        remove: {
          quantity: 2
        },
        repulse: {
          distance: 400,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          divs: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
            selectors: []
          }
        },
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1
        },
        light: {
          area: {
            gradient: {
              start: {
                value: "#ffffff"
              },
              stop: {
                value: "#000000"
              }
            },
            radius: 1000
          },
          shadow: {
            color: {
              value: "#000000"
            },
            length: 2000
          }
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 600
          }
        },
        enable: true,
        // outModes: {
        //   bottom: "out",
        //   left: "out",
        //   right: "out",
        //   top: "out"
        // },
        random: true,
        speed: 1
      },
      number: {
        density: {
          enable: true
        },
        value: 160
      },
      opacity: {
        // random: {
        //   enable: true
        // },
        value: {
          min: 0,
          max: 1
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0
        }
      },
      size: {
        // random: {
        //   enable: true
        // },
        value: {
          min: 1,
          max: 3
        },
        animation: {
          speed: 4,
          minimumValue: 0.3
        }
      },
      life: {
        count: 0,
        delay: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 0,
          sync: false
        },
        duration: {
          random: {
            enable: false,
            minimumValue: 0.0001
          },
          value: 0,
          sync: false
        }
      },
      roll: {
        darken: {
          enable: false,
          value: 0
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0
        },
        mode: "vertical",
        speed: 25
      },
      tilt: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          decay: 0,
          sync: false
        },
        direction: "clockwise",
        enable: false
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1
        }
      },
      wobble: {
        distance: 5,
        enable: false,
        speed: {
          angle: 50,
          move: 10
        }
      },
      orbit: {
        animation: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          sync: false
        },
        enable: false,
        opacity: 1,
        rotation: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 45
        },
        width: 1
      },
      links: {
        blink: false,
        color: {
          value: "#ffffff"
        },
        consent: false,
        distance: 150,
        enable: false,
        frequency: 1,
        opacity: 0.4,
        shadow: {
          blur: 5,
          color: {
            value: "#000"
          },
          enable: false
        },
        triangles: {
          enable: false,
          frequency: 1
        },
        width: 1,
        warp: false
      },
      repulse: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        enabled: false,
        distance: 1,
        duration: 1,
        factor: 1,
        speed: 1
      }
    }
  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }

  ngOnInit(): void {
    $('.img-agua').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.01,
      imageUrl : '../../assets/img/agua.jpg'
    });
    $('.imgMariposa').tilt({
      glare: true,
      maxGlare: .5,
      axis: "x"
    });
  }
}
