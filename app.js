import { cube } from "./assets/cube.js";
import { matProj } from "./matrix/matProj.js";

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");

  cube.render(matProj, canvas);
});
