import { Vec3d, Triangle, Mesh } from "../structs.js";
export const cube = new Mesh([
  // South
  new Triangle(new Vec3d(0, 0, 0), new Vec3d(0, 1, 0), new Vec3d(1, 1, 0)),
  new Triangle(new Vec3d(0, 0, 0), new Vec3d(1, 1, 0), new Vec3d(1, 0, 0)),
  // East
  new Triangle(new Vec3d(1, 0, 0), new Vec3d(1, 1, 0), new Vec3d(1, 1, 1)),
  new Triangle(new Vec3d(1, 0, 0), new Vec3d(1, 1, 0), new Vec3d(1, 1, 1)),
  // North
  new Triangle(new Vec3d(1, 0, 1), new Vec3d(1, 1, 1), new Vec3d(0, 1, 1)),
  new Triangle(new Vec3d(1, 0, 1), new Vec3d(0, 1, 1), new Vec3d(0, 0, 1)),
  // West
  new Triangle(new Vec3d(0, 0, 1), new Vec3d(0, 1, 1), new Vec3d(0, 1, 0)),
  new Triangle(new Vec3d(0, 0, 1), new Vec3d(0, 1, 0), new Vec3d(0, 0, 0)),
  // Top
  new Triangle(new Vec3d(0, 1, 0), new Vec3d(0, 1, 1), new Vec3d(1, 1, 1)),
  new Triangle(new Vec3d(0, 1, 0), new Vec3d(1, 1, 1), new Vec3d(1, 1, 0)),
  // Bottom
  new Triangle(new Vec3d(1, 0, 1), new Vec3d(0, 0, 1), new Vec3d(0, 0, 0)),
  new Triangle(new Vec3d(1, 0, 1), new Vec3d(0, 0, 0), new Vec3d(1, 0, 0)),
]);
