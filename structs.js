import { draw } from "./utils.js";

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
  mult(k) {
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
  static intersectPlane(planePosition, planeNormal, lineStart, lineEnd) {
    const normal = planeNormal.normalize();
    const plane_d = -normal.dot(planePosition);
    const ad = lineStart.dot(normal);
    const bd = lineEnd.dot(normal);
    const t = (-plane_d - ad) / (bd - ad);
    const lineStartToEnd = lineEnd.sub(lineStart);
    const lineToIntersect = lineStartToEnd.mult(t);

    return lineStart.add(lineToIntersect);
  }
  distToPlane(planeNormal, planePosition) {
    return (
      planeNormal.x * this.x +
      planeNormal.y * this.y +
      planeNormal.z * this.z -
      planeNormal.dot(planePosition)
    );
  }
}

export class Triangle {
  constructor(p0 = 0, p1 = 0, p2 = 0, color = [190, 190, 190]) {
    this.points = [p0, p1, p2];
    this.color = color;
  }

  clipAgainstPlane(planePosition, planeNormal) {
    const tris = [];
    const normal = planeNormal.normalize();

    const insidePoints = [];
    const outsidePoints = [];

    const d0 = this.points[0].distToPlane(normal, planePosition);
    const d1 = this.points[1].distToPlane(normal, planePosition);
    const d2 = this.points[2].distToPlane(normal, planePosition);

    d0 >= 0
      ? insidePoints.push(this.points[0])
      : outsidePoints.push(this.points[0]);
    d1 >= 0
      ? insidePoints.push(this.points[1])
      : outsidePoints.push(this.points[1]);
    d2 >= 0
      ? insidePoints.push(this.points[2])
      : outsidePoints.push(this.points[2]);

    if (insidePoints.length === 3) {
      tris.push(this);
    }

    if (insidePoints.length === 1 && outsidePoints.length == 2) {
      const p0 = insidePoints[0];
      const p1 = Vec3d.intersectPlane(
        planePosition,
        normal,
        insidePoints[0],
        outsidePoints[0]
      );
      const p2 = Vec3d.intersectPlane(
        planePosition,
        normal,
        insidePoints[0],
        outsidePoints[1]
      );
      tris.push(new Triangle(p0, p1, p2, this.color));
    }

    if (insidePoints.length === 2 && outsidePoints.length == 1) {
      const p0 = insidePoints[0];
      const p1 = insidePoints[1];

      let p2 = Vec3d.intersectPlane(
        planePosition,
        normal,
        insidePoints[0],
        outsidePoints[0]
      );
      tris.push(new Triangle(p0, p1, p2, this.color));

      p2 = Vec3d.intersectPlane(
        planePosition,
        normal,
        insidePoints[1],
        outsidePoints[0]
      );
      tris.push(new Triangle(p1, tris[0].points[2], p2, this.color));
    }

    return tris;
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

  transform(matrix) {
    let pointsTransformed = this.points.map(point => matrix.vectorMult(point));

    return new Triangle(...pointsTransformed, this.color);
  }

  scaleToView(width, height) {
    const scaledTri = new Triangle(0, 0, 0, this.color);
    const OffsetView = new Vec3d(1, 1, 0);

    scaledTri.points = this.points.map(point =>
      point.div(point.w).add(OffsetView)
    );

    scaledTri.points.forEach(point => {
      point.x *= 0.5 * width;
      point.y *= 0.5 * height;
    });

    return scaledTri;
  }

  isVisibleTo(vect) {
    return this.normal().dot(this.points[0].normalize().sub(vect)) < 0;
  }
}

export class Mesh {
  constructor(tris) {
    this.tris = tris;
  }

  render({
    camera,
    light,
    canvas,
    thetaX = 0,
    thetaY = 0,
    thetaZ = 0,
    translate = new Vec3d(0, 0, 0),
  }) {
    camera.update();
    const width = canvas.getAttribute("width");
    const height = canvas.getAttribute("height");
    const matRotX = Mat4x4.makeRotationX(thetaX);
    const matRotY = Mat4x4.makeRotationY(thetaY);
    const matRotZ = Mat4x4.makeRotationZ(thetaZ);
    const matTrans = Mat4x4.makeTranslation(translate);
    const matProj = Mat4x4.makeProjection(90, height / width, 0.1, 1000);

    const matWorld = Mat4x4.makeIdentity()
      .matrixMult(matRotX)
      .matrixMult(matRotY)
      .matrixMult(matRotZ)
      .matrixMult(matTrans);

    let target = new Vec3d(0, 0, 1);
    const cameraRotationY = Mat4x4.makeRotationY(camera.yaw);
    const cameraRotationX = Mat4x4.makeRotationX(
      camera.pitch * Math.cos(camera.yaw)
    );
    const cameraRotationZ = Mat4x4.makeRotationZ(
      camera.pitch * Math.sin(camera.yaw)
    );

    camera.lookDir = cameraRotationY
      .matrixMult(cameraRotationX)
      .matrixMult(cameraRotationZ)
      .vectorMult(target);

    target = camera.position.add(camera.lookDir);

    const matCamera = Mat4x4.PointAt(camera.position, target, camera.up);
    const matView = Mat4x4.quickInverse(matCamera);

    canvas.getContext("2d").clearRect(0, 0, width, height);

    const trisToRaster = [];

    this.tris.forEach(tri => {
      const triTransformed = tri.transform(matWorld);

      if (triTransformed.isVisibleTo(camera.position)) {
        const lum = triTransformed.normal().dot(light);

        const triViewed = triTransformed.transform(matView);

        const clippedAgainstView = triViewed.clipAgainstPlane(
          new Vec3d(0, 0, 0.1),
          new Vec3d(0, 0, 1)
        );

        clippedAgainstView.forEach(tri => {
          const triScaled = tri.transform(matProj).scaleToView(width, height);

          let queue = [];

          queue.push(
            ...triScaled.clipAgainstPlane(
              new Vec3d(0, 0, 0),
              new Vec3d(0, 1, 0)
            )
          );

          queue.forEach(tri => {
            queue.push(
              ...queue
                .shift()
                .clipAgainstPlane(
                  new Vec3d(0, height - 1, 0),
                  new Vec3d(0, -1, 0)
                )
            );
          });

          queue.forEach(tri => {
            queue.push(
              ...queue
                .shift()
                .clipAgainstPlane(new Vec3d(0, 0, 0), new Vec3d(1, 0, 0))
            );
          });

          queue.forEach(tri => {
            queue.push(
              ...queue
                .shift()
                .clipAgainstPlane(
                  new Vec3d(width - 1, 0, 0),
                  new Vec3d(-1, 0, 0)
                )
            );
          });

          queue.forEach(tri => {
            tri.lum = lum;

            trisToRaster.push(tri);
          });
        });
      }
    });

    trisToRaster.sort((a, b) => b.depth() - a.depth());
    trisToRaster.forEach(tri => draw(tri, canvas));
  }
}

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
