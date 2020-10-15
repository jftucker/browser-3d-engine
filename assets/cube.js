import { Vec3d, Triangle, Mesh } from "../structs.js";
export const cube = new Mesh([
  // South
  new Triangle(
    new Vec3d(-0.5, -0.5, -0.5),
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(0.5, 0.5, -0.5)
  ),
  new Triangle(
    new Vec3d(-0.5, -0.5, -0.5),
    new Vec3d(0.5, 0.5, -0.5),
    new Vec3d(0.5, -0.5, -0.5)
  ),
  // East
  new Triangle(
    new Vec3d(0.5, -0.5, -0.5),
    new Vec3d(0.5, 0.5, -0.5),
    new Vec3d(0.5, 0.5, 0.5)
  ),
  new Triangle(
    new Vec3d(0.5, -0.5, -0.5),
    new Vec3d(0.5, 0.5, 0.5),
    new Vec3d(0.5, -0.5, 0.5)
  ),
  // North
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(0.5, 0.5, 0.5),
    new Vec3d(-0.5, 0.5, 0.5)
  ),
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    new Vec3d(-0.5, -0.5, 0.5)
  ),
  // West
  new Triangle(
    new Vec3d(-0.5, -0.5, 0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    new Vec3d(-0.5, 0.5, -0.5)
  ),
  new Triangle(
    new Vec3d(-0.5, -0.5, 0.5),
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(-0.5, -0.5, -0.5)
  ),
  // Top
  new Triangle(
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    new Vec3d(0.5, 0.5, 0.5)
  ),
  new Triangle(
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(0.5, 0.5, 0.5),
    new Vec3d(0.5, 0.5, -0.5)
  ),
  // Bottom
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(-0.5, -0.5, 0.5),
    new Vec3d(-0.5, -0.5, -0.5)
  ),
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(-0.5, -0.5, -0.5),
    new Vec3d(0.5, -0.5, -0.5)
  ),
]);
