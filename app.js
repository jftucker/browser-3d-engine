import { hireme } from "./assets/hireme.js";
// import { cube } from "./assets/cube.js";
import { Vec3d } from "./structs.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const camera = new Vec3d(0, 0, 0);
  const light = new Vec3d(0, 0, -1).normalize();

  const render = (camera, light, canvas, startTime) => {
    let time = new Date();
    hireme.render(camera, light, canvas, (time - startTime) / 500);
  };

  setInterval(render, 10, camera, light, canvas, new Date());
});
