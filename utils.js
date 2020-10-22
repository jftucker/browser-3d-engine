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

export const render = rasterizer => {
  rasterizer.camera.update();

  rasterizer.canvas
    .getContext("2d")
    .clearRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

  let grd = rasterizer.canvas
    .getContext("2d")
    .createRadialGradient(
      config.CANVAS.WIDTH / 2,
      config.CANVAS.HEIGHT / 2,
      config.CANVAS.HEIGHT / 4,
      config.CANVAS.WIDTH / 2,
      config.CANVAS.HEIGHT * 2,
      config.CANVAS.WIDTH / 0.33
    );
  grd.addColorStop(0, "#65a6f0");
  grd.addColorStop(1, "blue");

  // Fill with gradient
  rasterizer.canvas.getContext("2d").fillStyle = grd;
  rasterizer.canvas
    .getContext("2d")
    .fillRect(0, 0, config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

  rasterizer.objects.forEach(obj => obj.render(rasterizer));

  rasterizer.rasterize();
};
