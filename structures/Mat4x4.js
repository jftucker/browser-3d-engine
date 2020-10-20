import { Vec3d } from "./Vec3d.js";

export class Mat4x4 {
  constructor(
    matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  ) {
    this.m = matrix;
  }

  static makeIdentity() {
    let m = new Mat4x4();
    m.m[0][0] = 1;
    m.m[1][1] = 1;
    m.m[2][2] = 1;
    m.m[3][3] = 1;
    return m;
  }

  static makeRotationX(theta) {
    let m = new Mat4x4();
    m.m[0][0] = 1;
    m.m[1][1] = Math.cos(theta);
    m.m[1][2] = Math.sin(theta);
    m.m[2][1] = -Math.sin(theta);
    m.m[2][2] = Math.cos(theta);
    m.m[3][3] = 1;

    return m;
  }

  static makeRotationY(theta) {
    let m = new Mat4x4();
    m.m[0][0] = Math.cos(theta);
    m.m[0][2] = Math.sin(theta);
    m.m[2][0] = -Math.sin(theta);
    m.m[1][1] = 1;
    m.m[2][2] = Math.cos(theta);
    m.m[3][3] = 1;

    return m;
  }

  static makeRotationZ(theta) {
    let m = new Mat4x4();

    m.m[0][0] = Math.cos(theta);
    m.m[0][1] = Math.sin(theta);
    m.m[1][0] = -Math.sin(theta);
    m.m[1][1] = Math.cos(theta);
    m.m[2][2] = 1;
    m.m[3][3] = 1;

    return m;
  }

  static makeTranslation(vect) {
    let m = new Mat4x4();

    m.m[0][0] = 1;
    m.m[1][1] = 1;
    m.m[2][2] = 1;
    m.m[3][3] = 1;
    m.m[3][0] = vect.x;
    m.m[3][1] = vect.y;
    m.m[3][2] = vect.z;

    return m;
  }

  static makeProjection(fov, aspectRatio, zNear, zFar) {
    const fovRad = 1 / Math.tan(((fov * 0.5) / 180) * Math.PI);
    let m = new Mat4x4();

    m.m[0][0] = aspectRatio * fovRad;
    m.m[1][1] = fovRad;
    m.m[2][2] = zFar / (zFar - zNear);
    m.m[3][2] = (-zFar * zNear) / (zFar - zNear);
    m.m[2][3] = 1;
    m.m[3][3] = 0;

    return m;
  }

  static PointAt(pos, target, up) {
    const newForward = target.sub(pos).normalize();
    const a = newForward.mult(up.dot(newForward));
    const newUp = up.sub(a).normalize();
    const newRight = newUp.cross(newForward);

    let m = new Mat4x4();

    m.m[0][0] = newRight.x;
    m.m[0][1] = newRight.y;
    m.m[0][2] = newRight.z;
    m.m[0][3] = 0;
    m.m[1][0] = newUp.x;
    m.m[1][1] = newUp.y;
    m.m[1][2] = newUp.z;
    m.m[1][3] = 0;
    m.m[2][0] = newForward.x;
    m.m[2][1] = newForward.y;
    m.m[2][2] = newForward.z;
    m.m[2][3] = 0;
    m.m[3][0] = pos.x;
    m.m[3][1] = pos.y;
    m.m[3][2] = pos.z;
    m.m[3][3] = 1;

    return m;
  }

  static quickInverse(matrix) {
    let m = new Mat4x4();

    m.m[0][0] = matrix.m[0][0];
    m.m[0][1] = matrix.m[1][0];
    m.m[0][2] = matrix.m[2][0];
    m.m[0][3] = 0;
    m.m[1][0] = matrix.m[0][1];
    m.m[1][1] = matrix.m[1][1];
    m.m[1][2] = matrix.m[2][1];
    m.m[1][3] = 0;
    m.m[2][0] = matrix.m[0][2];
    m.m[2][1] = matrix.m[1][2];
    m.m[2][2] = matrix.m[2][2];
    m.m[2][3] = 0;
    m.m[3][0] = -(
      matrix.m[3][0] * m.m[0][0] +
      matrix.m[3][1] * m.m[1][0] +
      matrix.m[3][2] * m.m[2][0]
    );
    m.m[3][1] = -(
      matrix.m[3][0] * m.m[0][1] +
      matrix.m[3][1] * m.m[1][1] +
      matrix.m[3][2] * m.m[2][1]
    );
    m.m[3][2] = -(
      matrix.m[3][0] * m.m[0][2] +
      matrix.m[3][1] * m.m[1][2] +
      matrix.m[3][2] * m.m[2][2]
    );
    m.m[3][3] = 1;

    return m;
  }

  matrixMult(m) {
    let result = new Mat4x4();

    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        result.m[r][c] =
          this.m[r][0] * m.m[0][c] +
          this.m[r][1] * m.m[1][c] +
          this.m[r][2] * m.m[2][c] +
          this.m[r][3] * m.m[3][c];
      }
    }

    return result;
  }

  vectorMult(vect) {
    const result = new Vec3d();
    result.x =
      vect.x * this.m[0][0] +
      vect.y * this.m[1][0] +
      vect.z * this.m[2][0] +
      vect.w * this.m[3][0];
    result.y =
      vect.x * this.m[0][1] +
      vect.y * this.m[1][1] +
      vect.z * this.m[2][1] +
      vect.w * this.m[3][1];
    result.z =
      vect.x * this.m[0][2] +
      vect.y * this.m[1][2] +
      vect.z * this.m[2][2] +
      vect.w * this.m[3][2];
    result.w =
      vect.x * this.m[0][3] +
      vect.y * this.m[1][3] +
      vect.z * this.m[2][3] +
      vect.w * this.m[3][3];

    return result;
  }
}
