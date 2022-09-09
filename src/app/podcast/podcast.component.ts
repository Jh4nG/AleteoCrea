import { Component, OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit {
  public id = "tsparticles";

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  public particlesUrl = "http://foo.bar/particles.json";

  constructor() { }


  /* or the classic JavaScript object */
  // particlesOptions = {
  //   background: {
  //     color: "#000"
  //   },
  //   fpsLimit: 120,
  //   interactivity: {
  //     events: {
  //       // onClick: {
  //       //   enable: true,
  //       //   mode: ClickMode.push
  //       // },
  //       onHover: {
  //         enable: true,
  //         mode: HoverMode.repulse
  //       },
  //       resize: true
  //     },
  //     modes: {
  //       push: {
  //         // quantity: 4
  //       },
  //       repulse: {
  //         distance: 200,
  //         // duration: 0.4
  //       }
  //     }
  //   },
  //   particles: {
  //     color: {
  //       value: "#ffffff"
  //     },
  //     links: {
  //       color: "#ffffff",
  //       distance: 150,
  //       enable: true,
  //       opacity: 0.5,
  //       width: 1
  //     },
  //     collisions: {
  //       enable: false
  //     },
  //     move: {
  //       direction: MoveDirection.none,
  //       enable: true,
  //       outModes: {
  //         default: OutMode.out
  //       },
  //       random: false,
  //       speed: 4,
  //       straight: false
  //     },
  //     number: {
  //       density: {
  //         enable: true,
  //         area: 800
  //       },
  //       value: 50
  //     },
  //     opacity: {
  //       value: 0.5
  //     },
  //     shape: {
  //       type: "circle"
  //     },
  //     size: {
  //       value: { min: 1, max: 5 },
  //     }
  //   },
  //   detectRetina: false
  // };

  /** Mariposa en SVG */
  particlesOptions = {
    background: {
      color: {
        value: "#000000"
      },
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    },
    fullScreen: {
      zIndex: 1
    },
    detectRetina: false,
    interactivity: {
      events: {
        onClick: {
          mode: "push"
        },
        onDiv: {
          selectors: "#repulse-div",
          mode: "repulse"
        },
        onHover: {
          enable: true,
          mode: "bubble"
        }
      },
      modes: {
        slow: {
          factor: 1,
          radius: 0
        },
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
          distance: 40,
          duration: 2,
          mix: false,
          opacity: 8,
          size: 6,
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
          distance: 200,
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
            y: 1200
          }
        },
        enable: true,
        outModes: {
          default: OutMode.out
        },
        speed: 1
      },
      number: {
        density: {
          area: 2000
        },
        value: 200
      },
      opacity: {
        value: {
          min: 0.05,
          max: 0.4
        },
        animation: {
          enable: true,
          minimumValue: 0.05
        }
      },
      size: {
        random: true,
        value: 1,
        animation: {
          speed: 40,
          minimumValue: 0.1
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
        distance: 30,
        enable: true,
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
    },
    polygon: {
      draw: {
        enable: true,
        stroke: {
          color: {
            value: "rgba(255,255,255,0.2)"
          },
          width: 1,
          opacity: 0.2
        }
      },
      enable: true,
      inlineArrangement: "equidistant",
      // inline: {
      //   arrangement: "one-per-point"
      // },
      move: {
        radius: 10,
        type: "path"
      },
      scale: 0.5,
      type: "inline",
      // url: "../assets/img/podcast/monarca.svg",
      url: "https://particles.js.org/images/smalldeer.svg"
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

    // setTimeout(()=>{
    //   loadFull(engine);
    // },1000)
  }

  ngOnInit(): void {

  }

}
