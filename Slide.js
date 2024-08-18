export class Slide {
  imageLoaded = false;

  constructor({
    canvas,
    ctx,
    x,
    y,
    width,
    height,
    numOfSlides,
    speed,
    gap,
    index,
    imageSrc,
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.numOfSlides = numOfSlides;
    this.gap = gap;
    this.speed = speed;
    this.index = index;
    this.totalWidth = this.numOfSlides * (this.width + this.gap);
    this.imageSrc = imageSrc;

    this.init();
  }

  update() {
    this.x += this.speed;

    if (this.speed > 0) {
      if (this.x >= this.canvas.width) {
        this.x -= this.totalWidth;
      }
    } else {
      if (this.x <= -this.canvas.width) {
        this.x += this.totalWidth;
      }
    }
  }

  getImageOffsets() {
    const imgAspect = this.naturalImg.w / this.naturalImg.h;
    const canvasAspect = this.width / this.height;

    let drawWidth, drawHeight;
    let offsetX = 0,
      offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawHeight = this.height;
      drawWidth = imgAspect * this.height;
      offsetX = (drawWidth - this.width) * 0.5;
    } else {
      drawWidth = this.width;
      drawHeight = this.width / imgAspect;
      offsetY = (drawHeight - this.height) * 0.5;
    }

    return { offsetX, offsetY, drawWidth, drawHeight };
  }

  draw() {
    this.ctx.beginPath();

    if (this.imageLoaded) {
      const { offsetX, offsetY, drawWidth, drawHeight } =
        this.getImageOffsets();

      this.ctx.drawImage(
        this.image,
        -offsetX + this.x,
        -offsetY + this.y,
        drawWidth,
        drawHeight
      );

      this.ctx.font = "40px serif";
      this.ctx.textBaseling = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(
        `asd ${this.index}`,
        this.x + this.width * 0.5,
        this.y + this.height * 0.5
      );
    }
  }

  init() {
    this.image = new Image();
    this.image.src = this.imageSrc;

    this.image.addEventListener("load", (e) => {
      this.imageLoaded = true;

      this.naturalImg = {
        w: e.target.naturalWidth,
        h: e.target.naturalHeight,
      };
    });
  }
}
