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
