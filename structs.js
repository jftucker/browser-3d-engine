import { draw } from "./utils.js";

export class Vec3d {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Triangle {
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
  }
}

export class Mesh {
  constructor(tris) {
    this.tris = tris;
  }

  render(matProj, canvas) {
    this.tris.forEach(tri => {
      console.log(tri);
      const p1Proj = matProj.mult(tri.points[0]);
      const p2Proj = matProj.mult(tri.points[1]);
      const p3Proj = matProj.mult(tri.points[2]);

      const triProjected = new Triangle(p1Proj, p2Proj, p3Proj);
      draw(triProjected, canvas);
    });
  }
}

export class Mat4x4 {
  constructor(matrix) {
    this.m = matrix;
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

    if (!w === 0) {
      result.x /= w;
      result.y /= w;
      result.z /= w;
    }

    return result;
  }
}
