import { cube } from "./assets/cube.js";
import { matProj } from "./matrix/matProj.js";
import { Vec3d } from "./structs.js";

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  const camera = new Vec3d(0, 0, 0);

  const render = (camera, matrix, canvas, startTime) => {
    let time = new Date();
    cube.render(camera, matrix, canvas, (time - startTime) / 500);
  };
  setInterval(render, 0.1, camera, matProj, canvas, new Date());
});
