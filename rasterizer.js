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
  rasterize() {
    this.trisToRaster.sort((a, b) => b.depth() - a.depth());
    this.trisToRaster.forEach(tri => draw(tri, this.canvas));
    this.trisToRaster = [];
  }
  static render(rasterizer) {
    rasterizer.camera.update();

    rasterizer.canvas
      .getContext("2d")
      .clearRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

    let grd = rasterizer.canvas
      .getContext("2d")
      .createRadialGradient(
        config.CANVAS.WIDTH / 2,
        config.CANVAS.HEIGHT / 2,
        config.CANVAS.HEIGHT / 4,
        config.CANVAS.WIDTH / 2,
        config.CANVAS.HEIGHT * 2,
        config.CANVAS.WIDTH / 0.33
      );
    grd.addColorStop(0, "#65a6f0");
    grd.addColorStop(1, "blue");

    // Fill with gradient
    rasterizer.canvas.getContext("2d").fillStyle = grd;
    rasterizer.canvas
      .getContext("2d")
      .fillRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

    rasterizer.objects.forEach(obj => obj.render(rasterizer));

    rasterizer.rasterize();
  }
}
