import { hireme } from "./assets/hireme.js";
import { matProj } from "./matrix/matProj.js";
import { Vec3d } from "./structs.js";

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  const camera = new Vec3d(0, 0, 0);

  const render = (camera, matrix, canvas, startTime) => {
    let time = new Date();
    hireme.render(camera, matrix, canvas, (time - startTime) / 500);
  };
  setInterval(render, 10, camera, matProj, canvas, new Date());
});
