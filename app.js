import mountains from "./assets/mountains.js";
import hireme from "./assets/hireme.js";
import { Vec3d } from "./structures/Vec3d.js";
import { Camera } from "./camera.js";
import { config } from "./config.js";
import { configureCanvas } from "./utils.js";
import { Rasterizer } from "./rasterizer.js";

function toggleVisibility(id) {
  const element = document.getElementById(id);

  element.style.display === "block"
    ? (element.style.display = "none")
    : (element.style.display = "block");
}

document.toggleVisibility = toggleVisibility;

document.addEventListener("DOMContentLoaded", () => {
  const camera = new Camera(
    ...config.CAMERA.STARTING_POSITION,
    ...config.CAMERA.STARTING_ORIENTATION,
    config.CAMERA.STARTING_LOOK_DIRECTION
  );
  const light = new Vec3d(...config.LIGHTS.GLOBAL_LIGHT_SOURCE);
  const canvas = configureCanvas("canvas");
  const objects = [mountains, hireme];

  const rasterizer = new Rasterizer(camera, light, canvas, objects);

  setInterval(Rasterizer.render, config.MILLISECONDS_PER_FRAME, rasterizer);
});
