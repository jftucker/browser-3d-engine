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

  render(matProj, canvas, frame) {
    canvas.getContext("2d").clearRect(0, 0, 800, 600);
    this.tris.forEach(tri => {
      const p1RotZ = Mat4x4.rotateZ(tri.points[0], frame);
      const p2RotZ = Mat4x4.rotateZ(tri.points[1], frame);
      const p3RotZ = Mat4x4.rotateZ(tri.points[2], frame);

      const p1RotX = Mat4x4.rotateX(p1RotZ, frame * 0.5);
      const p2RotX = Mat4x4.rotateX(p2RotZ, frame * 0.5);
      const p3RotX = Mat4x4.rotateX(p3RotZ, frame * 0.5);

      const p1Trans = new Vec3d(p1RotX.x, p1RotX.y, p1RotX.z + 3);
      const p2Trans = new Vec3d(p2RotX.x, p2RotX.y, p2RotX.z + 3);
      const p3Trans = new Vec3d(p3RotX.x, p3RotX.y, p3RotX.z + 3);

      const triTranslated = new Triangle(p1Trans, p2Trans, p3Trans);

      const p1Proj = matProj.mult(triTranslated.points[0]);
      const p2Proj = matProj.mult(triTranslated.points[1]);
      const p3Proj = matProj.mult(triTranslated.points[2]);

      const triProjected = new Triangle(p1Proj, p2Proj, p3Proj);
      draw(triProjected, canvas);
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
