import { hireme } from "./assets/hireme.js";
import { cube } from "./assets/cube.js";
import { axis } from "./assets/axis.js";
import { Vec3d } from "./structs.js";
import { Camera } from "./camera.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const camera = new Camera(0, 0, 0);
  const lookDir = new Vec3d(0, 0, 1);
  const light = new Vec3d(0, 0, -1).normalize();

  function move(e) {
    if (e.keyCode === 37) {
      camera.moveLeft = true;
    } else if (e.keyCode === 38) {
      camera.moveUp = true;
    } else if (e.keyCode === 39) {
      camera.moveRight = true;
    } else if (e.keyCode === 40) {
      camera.moveDown = true;
    }
  }

  function stop(e) {
    if (e.keyCode === 37) {
      camera.moveLeft = false;
    } else if (e.keyCode === 38) {
      camera.moveUp = false;
    } else if (e.keyCode === 39) {
      camera.moveRight = false;
    } else if (e.keyCode === 40) {
      camera.moveDown = false;
    }
  }

  document.addEventListener("keydown", move);
  document.addEventListener("keyup", stop);

  const render = (camera, lookDir, light, canvas, startTime) => {
    let time = new Date();
    axis.render(camera, lookDir, light, canvas, 0);
  };

  setInterval(render, 10, camera, lookDir, light, canvas, new Date());
});
