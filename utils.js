import { config } from "./config.js";

export function drawWireframe(triangle, canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(triangle.points[0].x, triangle.points[0].y);
    ctx.lineTo(triangle.points[1].x, triangle.points[1].y);
    ctx.lineTo(triangle.points[2].x, triangle.points[2].y);
    ctx.lineTo(triangle.points[0].x, triangle.points[0].y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export function draw(triangle, canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(triangle.points[0].x, triangle.points[0].y);
    ctx.lineTo(triangle.points[1].x, triangle.points[1].y);
    ctx.lineTo(triangle.points[2].x, triangle.points[2].y);
    ctx.fillStyle = `rgba(${triangle.color[0] * triangle.lum}, ${triangle
      .color[1] * triangle.lum}, ${triangle.color[2] * triangle.lum}, 1)`;
    ctx.fill();
  }
}

export function configureCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);

  canvas.requestPointerLock =
    canvas.requestPointerLock ||
    canvas.mozRequestPointerLock ||
    canvas.webkitRequestPointerLock;

  canvas.setAttribute("width", config.CANVAS.WIDTH);
  canvas.setAttribute("height", config.CANVAS.HEIGHT);

  return canvas;
}

export function configureDocument() {
  function toggleVisibility() {
    document.querySelector(".why").classList.toggle("collapsed");
  }
  document.toggleVisibility = toggleVisibility;
}
