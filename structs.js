import { draw, drawWireframe } from "./utils.js";

export class Vec3d {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  sub(vect) {
    return new Vec3d(this.x - vect.x, this.y - vect.y, this.z - vect.z);
  }
  dot(vect) {
    return this.x * vect.x + this.y * vect.y + this.z * vect.z;
  }
  cross(vect) {
    return new Vec3d(
      this.y * vect.z - this.z * vect.y,
      this.z * vect.x - this.x * vect.z,
      this.x * vect.y - this.y * vect.x
    );
  }
  normalize() {
    const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return new Vec3d(this.x / len, this.y / len, this.z / len);
  }
}

export class Triangle {
  constructor(p1, p2, p3, color = [190, 190, 190]) {
    this.points = [p1, p2, p3];
    this.color = color;
  }
  normal() {
    const line1 = this.points[1].sub(this.points[0]);
    const line2 = this.points[2].sub(this.points[0]);

    let normal = line1.cross(line2);

    return normal.normalize();
  }
  transform(func, ...args) {
    const result = [];
    this.points.forEach(point => result.push(func(point, ...args)));
    return new Triangle(...result, this.color);
  }
  isVisibleTo(vect) {
    return this.normal().dot(this.points[0].normalize().sub(vect)) < 0;
  }
}

export class Mesh {
  constructor(tris) {
    this.tris = tris;
  }

  render(camera, matProj, canvas, frame) {
    const width = canvas.getAttribute("width");
    const height = canvas.getAttribute("height");

    canvas.getContext("2d").clearRect(0, 0, width, height);
    this.tris.forEach(tri => {
      const triRotZ = tri.transform(Mat4x4.rotateZ, frame);
      const triRotX = triRotZ.transform(Mat4x4.rotateX, frame * 0.5);
      const triTran = triRotX.transform(
        vect => new Vec3d(vect.x, vect.y, vect.z + 3)
      );
      if (triTran.isVisibleTo(camera)) {
        const light = new Vec3d(0, 0, -1).normalize();
        const lum = triTran.normal().dot(light);

        const triProj = triTran.transform(
          (vect, matProj) => matProj.mult(vect),
          matProj
        );

        draw(triProj, canvas, lum);
        // drawWireframe(triProj, canvas);
      }
    });
  }
}

export class Mat4x4 {
  constructor(matrix) {
    this.m = matrix;
  }

  static rotateX(vect, theta) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    m[0][0] = 1;
    m[1][1] = Math.cos(theta);
    m[1][2] = Math.sin(theta);
    m[2][1] = -Math.sin(theta);
    m[2][2] = Math.cos(theta);
    m[3][3] = 1;

    const result = new Vec3d();
    result.x = vect.x * m[0][0] + vect.y * m[1][0] + vect.z * m[2][0] + m[3][0];
    result.y = vect.x * m[0][1] + vect.y * m[1][1] + vect.z * m[2][1] + m[3][1];
    result.z = vect.x * m[0][2] + vect.y * m[1][2] + vect.z * m[2][2] + m[3][2];
    let w = vect.x * m[0][3] + vect.y * m[1][3] + vect.z * m[2][3] + m[3][3];

    if (!w == 0) {
      result.x = result.x / w;
      result.y /= w;
      result.z /= w;
    }

    return result;
  }

  static rotateZ(vect, theta) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    m[0][0] = Math.cos(theta);
    m[0][1] = Math.sin(theta);
    m[1][0] = -Math.sin(theta);
    m[1][1] = Math.cos(theta);
    m[2][2] = 1;
    m[3][3] = 1;

    const result = new Vec3d();
    result.x = vect.x * m[0][0] + vect.y * m[1][0] + vect.z * m[2][0] + m[3][0];
    result.y = vect.x * m[0][1] + vect.y * m[1][1] + vect.z * m[2][1] + m[3][1];
    result.z = vect.x * m[0][2] + vect.y * m[1][2] + vect.z * m[2][2] + m[3][2];
    let w = vect.x * m[0][3] + vect.y * m[1][3] + vect.z * m[2][3] + m[3][3];

    if (!w == 0) {
      result.x = result.x / w;
      result.y /= w;
      result.z /= w;
    }

    return result;
  }

  mult(vect) {
    const result = new Vec3d();
    result.x =
      vect.x * this.m[0][0] +
      vect.y * this.m[1][0] +
      vect.z * this.m[2][0] +
      this.m[3][0];
    result.y =
      vect.x * this.m[0][1] +
      vect.y * this.m[1][1] +
      vect.z * this.m[2][1] +
      this.m[3][1];
    result.z =
      vect.x * this.m[0][2] +
      vect.y * this.m[1][2] +
      vect.z * this.m[2][2] +
      this.m[3][2];
    let w =
      vect.x * this.m[0][3] +
      vect.y * this.m[1][3] +
      vect.z * this.m[2][3] +
      this.m[3][3];

    if (!w == 0) {
      result.x = result.x / w;
      result.y /= w;
      result.z /= w;
    }

    return result;
  }
}
