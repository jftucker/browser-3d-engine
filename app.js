import { hireme } from "./assets/hireme.js";
import { Vec3d } from "./structures/Vec3d.js";
import { Camera } from "./camera.js";
import { config } from "./config.js";
import { configureCanvas } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const camera = new Camera(...config.CAMERA.STARTING_POSITION);
  const light = new Vec3d(-0.5, -0.5, -1);
  const canvas = configureCanvas("canvas");

  const render = args => {
    hireme.render(args);
  };

  setInterval(render, config.MILLISECONDS_PER_FRAME, {
    camera,
    light,
    canvas,
    thetaY: Math.PI,
  });
});
