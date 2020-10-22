import { draw } from "./utils.js";
import { config } from "./config.js";

export class Rasterizer {
  constructor(camera, light, canvas, objects, trisToRaster = []) {
    this.camera = camera;
    this.light = light;
    this.canvas = canvas;
    this.objects = objects;
    this.trisToRaster = trisToRaster;
  }

  clearCanvas() {
    this.canvas
      .getContext("2d")
      .clearRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);
  }

  generateBg() {
    let w;
    let h;

    config.CANVAS.WIDTH < config.CANVAS.HEIGHT
      ? ([w, h] = [config.CANVAS.HEIGHT, config.CANVAS.WIDTH])
      : ([h, w] = [config.CANVAS.HEIGHT, config.CANVAS.WIDTH]);

    let gradient = this.canvas
      .getContext("2d")
      .createRadialGradient(w / 2, h / 2, h / 4, w / 2, h * 2, w / 0.33);
    gradient.addColorStop(0, config.COLORS.SKY_LIGHT);
    gradient.addColorStop(1, config.COLORS.SKY_DARK);

    this.canvas.getContext("2d").fillStyle = gradient;
    this.canvas
      .getContext("2d")
      .fillRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);
  }

  rasterize() {
    this.trisToRaster.sort((a, b) => b.depth() - a.depth());
    this.trisToRaster.forEach(tri => draw(tri, this.canvas));
    this.trisToRaster = [];
  }

  static render(rasterizer) {
    rasterizer.camera.update();
    rasterizer.clearCanvas();
    rasterizer.generateBg();
    rasterizer.objects.forEach(obj => obj.render(rasterizer));
    rasterizer.rasterize();
  }
}
