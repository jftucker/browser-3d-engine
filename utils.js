export function drawWireframe(triangle, canvas) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    const width = canvas.getAttribute("width");
    const height = canvas.getAttribute("height");

    // Scale into view
    triangle.points[0].x += 1;
    triangle.points[0].y += 1;
    triangle.points[1].x += 1;
    triangle.points[1].y += 1;
    triangle.points[2].x += 1;
    triangle.points[2].y += 1;

    triangle.points[0].x *= 0.5 * width;
    triangle.points[0].y *= 0.5 * height;
    triangle.points[1].x *= 0.5 * width;
    triangle.points[1].y *= 0.5 * height;
    triangle.points[2].x *= 0.5 * width;
    triangle.points[2].y *= 0.5 * height;

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

export function draw(triangle, canvas, lum) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    const width = canvas.getAttribute("width");
    const height = canvas.getAttribute("height");

    // Scale into view
    triangle.points[0].x += 1;
    triangle.points[0].y += 1;
    triangle.points[1].x += 1;
    triangle.points[1].y += 1;
    triangle.points[2].x += 1;
    triangle.points[2].y += 1;

    triangle.points[0].x *= 0.5 * width;
    triangle.points[0].y *= 0.5 * height;
    triangle.points[1].x *= 0.5 * width;
    triangle.points[1].y *= 0.5 * height;
    triangle.points[2].x *= 0.5 * width;
    triangle.points[2].y *= 0.5 * height;

    ctx.beginPath();
    ctx.moveTo(triangle.points[0].x, triangle.points[0].y);
    ctx.lineTo(triangle.points[1].x, triangle.points[1].y);
    ctx.lineTo(triangle.points[2].x, triangle.points[2].y);
    ctx.fillStyle = `rgba(${triangle.color[0] * lum}, ${triangle.color[1] *
      lum}, ${triangle.color[2] * lum}, 1)`;
    ctx.fill();
  }
}
