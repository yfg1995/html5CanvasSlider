import { CanvasTest } from "./CanvasSlider";
import "./style.css";

const imagesData = [
  {
    noImages: 12,
  },
  {
    noImages: 20,
  },
  {
    noImages: 15,
  },
];

const images = [];

imagesData.forEach((data, idx) => {
  images.push([]);

  for (let i = 0; i < data.noImages; i++) {
    images[idx].push(`https://picsum.photos/${400 + i * 10}/${800 + i * 10}`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const canvasWraps = document.querySelectorAll(".canvasWrap");

  if (canvasWraps.length > 0) {
    canvasWraps.forEach((wrap, i) => {
      const { gap, speed } = wrap.dataset;
      const width = +getComputedStyle(wrap).getPropertyValue("--width") ?? 200;
      const height =
        +getComputedStyle(wrap).getPropertyValue("--height") ?? 200;

      new CanvasTest({
        wrap,
        images: images[i],
        gap: +gap ?? 30,
        speed: +speed ?? 2,
        width,
        height,
      });
    });
  }
});
