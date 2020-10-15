import { cube } from "./assets/cube.js";
import { matProj } from "./matrix/matProj.js";

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");

  const render = (matrix, canvas, startTime) => {
    let time = new Date();
    cube.render(matrix, canvas, (time - startTime) / 500);
  };
  setInterval(render, 0.1, matProj, canvas, new Date());
});
