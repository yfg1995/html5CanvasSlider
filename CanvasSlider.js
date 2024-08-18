import { Slide } from "./Slide";

export class CanvasTest {
  x = 0;
  y = 0;
  animating = false;

  constructor({ wrap, images, gap, speed, width, height }) {
    this.wrap = wrap;
    this.images = images;
    this.slides = [];
    this.width = width;
    this.height = height;
    this.gap = gap;
    this.numberOfSlides = images.length;
    this.speed = speed;
    this.init();
  }

  initSlides() {
    for (let i = 0; i < this.numberOfSlides; i++) {
      this.slides.push(
        new Slide({
          canvas: this.canvas,
          ctx: this.ctx,
          x: i * (this.width + this.gap),
          y: this.y,
          width: this.width,
          height: this.height,
          numOfSlides: this.numberOfSlides,
          speed: this.speed,
          gap: this.gap,
          index: i,
          imageSrc: this.images[i],
        })
      );
    }
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.wrap.appendChild(this.canvas);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.slides.forEach((slide) => {
      slide.draw();
      slide.update();
    });

    // if (this.animating) {
    requestAnimationFrame(this.draw.bind(this));
    // }
  }

  setup() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.height;
  }

  listeners() {
    window.addEventListener("resize", () => {
      this.setup();
    });
  }

  init() {
    this.createCanvas();
    this.setup();
    this.listeners();
    this.initSlides();

    this.draw();
  }
}
