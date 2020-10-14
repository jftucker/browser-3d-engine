import { cube } from "./assets/cube.js";
import { Vec3d } from "./structs.js";
import { matProj } from "./matrix/matProj.js";

document.addEventListener("DOMContentLoaded", () => {
  cube.render();

  console.log(matProj.mult(new Vec3d(1, 2, 3)));
});
