import { Vec3d } from "./Vec3d.js";

export class Triangle {
  constructor(p0 = 0, p1 = 0, p2 = 0, color = [190, 190, 190]) {
    this.points = [p0, p1, p2];
    this.color = color;
  }

  clipAgainstPlane({ planePosition, planeNormal }) {
    const tris = [];
    const normal = planeNormal.normalize();

    const insidePoints = [];
    const outsidePoints = [];

    this.points.forEach(point =>
      point.distToPlane(normal, planePosition) >= 0
        ? insidePoints.push(point)
        : outsidePoints.push(point)
    );

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
