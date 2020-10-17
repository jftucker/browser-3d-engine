import { draw, drawWireframe } from "./utils.js";

export class Vec3d {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  add(vect) {
    return new Vec3d(this.x + vect.x, this.y + vect.y, this.z + vect.z);
  }
  sub(vect) {
    return new Vec3d(this.x - vect.x, this.y - vect.y, this.z - vect.z);
  }
  mul(k) {
    return new Vec3d(this.x * k, this.y * k, this.z * k);
  }
  div(k) {
    return new Vec3d(this.x / k, this.y / k, this.z / k);
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
  len() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  normalize() {
    const len = this.len();
    return new Vec3d(this.x / len, this.y / len, this.z / len);
  }
}

export class Triangle {
  constructor(p1, p2, p3, color = [190, 190, 190]) {
    this.points = [p1, p2, p3];
    this.color = color;
  }
  depth() {
    return (this.points[0].z + this.points[1].z + this.points[2].z) / 3;
  }
  normal() {
    const line1 = this.points[1].sub(this.points[0]);
    const line2 = this.points[2].sub(this.points[0]);

    let normal = line1.cross(line2);

    return normal.normalize();
  }
  isVisibleTo(vect) {
    return this.normal().dot(this.points[0].normalize().sub(vect)) < 0;
  }
}

export class Mesh {
  constructor(tris) {
    this.tris = tris;
  }

  render(camera, light, canvas, frame) {
    camera.update();
    const width = canvas.getAttribute("width");
    const height = canvas.getAttribute("height");
    const matProj = Mat4x4.makeProjection(90, height / width, 0.1, 1000);
    const matRotX = Mat4x4.makeRotateX(frame);
    const matRotZ = Mat4x4.makeRotateZ(frame * 0.5);
    const matTrans = Mat4x4.makeTranslation(0, 0, 0);

    const matWorld = Mat4x4.makeIdentity()
      .matrixMult(matRotX)
      .matrixMult(matRotZ)
      .matrixMult(matTrans);

    const up = new Vec3d(0, -1, 0);
    let target = new Vec3d(0, 0, 1);
    const CameraRot = Mat4x4.makeRotateY(camera.yaw);
    const lookDir = CameraRot.vectorMult(target);
    target = camera.position.add(lookDir);

    const matCamera = Mat4x4.PointAt(camera.position, target, up);
    const matView = Mat4x4.quickInverse(matCamera);

    canvas.getContext("2d").clearRect(0, 0, width, height);

    const trisToRaster = [];

    this.tris.forEach(tri => {
      const triTransformed = new Triangle(
        matWorld.vectorMult(tri.points[0]),
        matWorld.vectorMult(tri.points[1]),
        matWorld.vectorMult(tri.points[2]),
        tri.color
      );

      if (triTransformed.isVisibleTo(camera.position)) {
        const lum = triTransformed.normal().dot(light);

        const triViewed = new Triangle(
          matView.vectorMult(triTransformed.points[0]),
          matView.vectorMult(triTransformed.points[1]),
          matView.vectorMult(triTransformed.points[2]),
          triTransformed.color
        );

        const triProj = new Triangle(
          matProj.vectorMult(triViewed.points[0]),
          matProj.vectorMult(triViewed.points[1]),
          matProj.vectorMult(triViewed.points[2]),
          triTransformed.color
        );

        triProj.points[0] = triProj.points[0].div(triProj.points[0].w);
        triProj.points[1] = triProj.points[1].div(triProj.points[1].w);
        triProj.points[2] = triProj.points[2].div(triProj.points[2].w);
        triProj.lum = lum;

        const OffsetView = new Vec3d(1, 1, 0);

        triProj.points[0] = triProj.points[0].add(OffsetView);
        triProj.points[1] = triProj.points[1].add(OffsetView);
        triProj.points[2] = triProj.points[2].add(OffsetView);

        triProj.points[0].x *= 0.5 * width;
        triProj.points[0].y *= 0.5 * height;
        triProj.points[1].x *= 0.5 * width;
        triProj.points[1].y *= 0.5 * height;
        triProj.points[2].x *= 0.5 * width;
        triProj.points[2].y *= 0.5 * height;

        trisToRaster.push(triProj);
      }
    });

    trisToRaster.sort((a, b) => b.depth() - a.depth());
    trisToRaster.forEach(tri => draw(tri, canvas));
  }
}

export class Mat4x4 {
  constructor(matrix) {
    this.m = matrix;
  }

  static makeIdentity() {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    m[0][0] = 1;
    m[1][1] = 1;
    m[2][2] = 1;
    m[3][3] = 1;
    return new Mat4x4(m);
  }

  static makeRotateX(theta) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    m[0][0] = 1;
    m[1][1] = Math.cos(theta);
    m[1][2] = Math.sin(theta);
    m[2][1] = -Math.sin(theta);
    m[2][2] = Math.cos(theta);
    m[3][3] = 1;

    return new Mat4x4(m);
  }

  static makeRotateY(theta) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    m[0][0] = Math.cos(theta);
    m[0][2] = Math.sin(theta);
    m[2][0] = -Math.sin(theta);
    m[1][1] = 1;
    m[2][2] = Math.cos(theta);
    m[3][3] = 1;

    return new Mat4x4(m);
  }

  static makeRotateZ(theta) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    m[0][0] = Math.cos(theta);
    m[0][1] = Math.sin(theta);
    m[1][0] = -Math.sin(theta);
    m[1][1] = Math.cos(theta);
    m[2][2] = 1;
    m[3][3] = 1;

    return new Mat4x4(m);
  }

  static makeTranslation(x, y, z) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    m[0][0] = 1;
    m[1][1] = 1;
    m[2][2] = 1;
    m[3][3] = 1;
    m[3][0] = x;
    m[3][1] = y;
    m[3][2] = z;

    return new Mat4x4(m);
  }

  static makeProjection(fov, aspectRatio, zNear, zFar) {
    const fovRad = 1 / Math.tan(((fov * 0.5) / 180) * Math.PI);
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    m[0][0] = aspectRatio * fovRad;
    m[1][1] = fovRad;
    m[2][2] = zFar / (zFar - zNear);
    m[3][2] = (-zFar * zNear) / (zFar - zNear);
    m[2][3] = 1;
    m[3][3] = 0;

    return new Mat4x4(m);
  }

  static PointAt(pos, target, up) {
    const newForward = target.sub(pos).normalize();
    const a = newForward.mul(up.dot(newForward));
    const newUp = up.sub(a).normalize();
    const newRight = newUp.cross(newForward);

    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    m[0][0] = newRight.x;
    m[0][1] = newRight.y;
    m[0][2] = newRight.z;
    m[0][3] = 0;
    m[1][0] = newUp.x;
    m[1][1] = newUp.y;
    m[1][2] = newUp.z;
    m[1][3] = 0;
    m[2][0] = newForward.x;
    m[2][1] = newForward.y;
    m[2][2] = newForward.z;
    m[2][3] = 0;
    m[3][0] = pos.x;
    m[3][1] = pos.y;
    m[3][2] = pos.z;
    m[3][3] = 1;

    return new Mat4x4(m);
  }

  static quickInverse(matrix) {
    let m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    m[0][0] = matrix.m[0][0];
    m[0][1] = matrix.m[1][0];
    m[0][2] = matrix.m[2][0];
    m[0][3] = 0;
    m[1][0] = matrix.m[0][1];
    m[1][1] = matrix.m[1][1];
    m[1][2] = matrix.m[2][1];
    m[1][3] = 0;
    m[2][0] = matrix.m[0][2];
    m[2][1] = matrix.m[1][2];
    m[2][2] = matrix.m[2][2];
    m[2][3] = 0;
    m[3][0] = -(
      matrix.m[3][0] * m[0][0] +
      matrix.m[3][1] * m[1][0] +
      matrix.m[3][2] * m[2][0]
    );
    m[3][1] = -(
      matrix.m[3][0] * m[0][1] +
      matrix.m[3][1] * m[1][1] +
      matrix.m[3][2] * m[2][1]
    );
    m[3][2] = -(
      matrix.m[3][0] * m[0][2] +
      matrix.m[3][1] * m[1][2] +
      matrix.m[3][2] * m[2][2]
    );
    m[3][3] = 1;

    return new Mat4x4(m);
  }

  matrixMult(m) {
    let result = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        result[r][c] =
          this.m[r][0] * m.m[0][c] +
          this.m[r][1] * m.m[1][c] +
          this.m[r][2] * m.m[2][c] +
          this.m[r][3] * m.m[3][c];
      }
    }

    return new Mat4x4(result);
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
