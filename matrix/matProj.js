import { Mat4x4 } from "../structs.js";

const zNear = 0.1;
const zFar = 1000;
const fov = 90.0;
const aspectRatio =
  document.getElementById("canvas").getAttribute("height") /
  document.getElementById("canvas").getAttribute("width");
const fovRad = 1 / Math.tan(((fov * 0.5) / 180) * Math.PI);

let matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

matrix[0][0] = aspectRatio * fovRad;
matrix[1][1] = fovRad;
matrix[2][2] = zFar / (zFar - zNear);
matrix[3][2] = (-zFar * zNear) / (zFar - zNear);
matrix[2][3] = 1;
matrix[3][3] = 0;

console.log(matrix);

export const matProj = new Mat4x4(matrix);
