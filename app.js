import { hireme } from "./assets/hireme.js";
import { Vec3d } from "./structs.js";
import { Camera } from "./camera.js";
import { command } from "./interface.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const camera = new Camera(0, 0, -10);
  const light = new Vec3d(0, 0, -1).normalize();

  canvas.requestPointerLock =
    canvas.requestPointerLock ||
    canvas.mozRequestPointerLock ||
    canvas.webkitRequestPointerLock;

  document.addEventListener("keydown", command(camera));
  document.addEventListener("keyup", command(camera));
  document.addEventListener("mousemove", command(camera));

  const render = args => {
    hireme.render(args);
  };

  setInterval(render, 10, { camera, light, canvas, thetaY: Math.PI });
});
