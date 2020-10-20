import { hireme } from "./assets/hireme.js";
import { Vec3d } from "./structures/Vec3d.js";
import { Camera } from "./camera.js";
import { command } from "./interface.js";
import { config } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const camera = new Camera(0, 0, -10);
  const light = new Vec3d(0, 0, -1).normalize();

  canvas.setAttribute("width", config.CANVAS.WIDTH);
  canvas.setAttribute("height", config.CANVAS.HEIGHT);

  canvas.requestPointerLock =
    canvas.requestPointerLock ||
    canvas.mozRequestPointerLock ||
    canvas.webkitRequestPointerLock;

  document.addEventListener("keydown", command(camera));
  document.addEventListener("keyup", command(camera));
  document.addEventListener("mousemove", command(camera));

  hireme.tris.forEach(tri => (tri.color = [200, 100, 50]));

  const render = args => {
    hireme.render(args);
  };

  setInterval(render, 1000 / 60, { camera, light, canvas, thetaY: Math.PI });
});
