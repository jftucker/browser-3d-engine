import { assets } from "./assets/assets.js";
import { Vec3d } from "./structures/Vec3d.js";
import { Camera } from "./camera.js";
import { config } from "./config.js";
import { configureCanvas, configureDocument } from "./utils.js";
import { Rasterizer } from "./rasterizer.js";

configureDocument();

document.addEventListener("DOMContentLoaded", () => {
  const camera = new Camera(
    ...config.CAMERA.STARTING_POSITION,
    ...config.CAMERA.STARTING_ORIENTATION,
    config.CAMERA.STARTING_LOOK_DIRECTION
  );
  const light = new Vec3d(...config.LIGHTS.GLOBAL_LIGHT_SOURCE);
  const canvas = configureCanvas("canvas");

  const rasterizer = new Rasterizer(camera, light, canvas, assets);

  setInterval(Rasterizer.render, config.MILLISECONDS_PER_FRAME, rasterizer);
});
