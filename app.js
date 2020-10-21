import mountains from "./assets/mountains.js";
import hireme from "./assets/hireme.js";
import { Vec3d } from "./structures/Vec3d.js";
import { Camera } from "./camera.js";
import { config } from "./config.js";
import { configureCanvas, render } from "./utils.js";
import { Rasterizer } from "./rasterizer.js";

document.addEventListener("DOMContentLoaded", () => {
  const camera = new Camera(
    ...config.CAMERA.STARTING_POSITION,
    ...config.CAMERA.STARTING_ORIENTATION,
    config.CAMERA.STARTING_LOOK_DIRECTION
  );
  const light = new Vec3d(-0.4, 0.5, -0.4);
  const canvas = configureCanvas("canvas");
  const objects = [mountains, hireme];

  const rasterizer = new Rasterizer(camera, light, canvas, objects);

  setInterval(Rasterizer.render, config.MILLISECONDS_PER_FRAME, rasterizer);
});
