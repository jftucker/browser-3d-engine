import { Vec3d, Triangle, Mesh } from "../structs.js";
export const cube = new Mesh([
  // South
  new Triangle(
    new Vec3d(-0.5, -0.5, -0.5),
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(0.5, 0.5, -0.5),
    [200, 100, 50]
  ),
  new Triangle(
    new Vec3d(-0.5, -0.5, -0.5),
    new Vec3d(0.5, 0.5, -0.5),
    new Vec3d(0.5, -0.5, -0.5),
    [200, 100, 50]
  ),
  // East
  new Triangle(
    new Vec3d(0.5, -0.5, -0.5),
    new Vec3d(0.5, 0.5, -0.5),
    new Vec3d(0.5, 0.5, 0.5),
    [200, 100, 50]
  ),
  new Triangle(
    new Vec3d(0.5, -0.5, -0.5),
    new Vec3d(0.5, 0.5, 0.5),
    new Vec3d(0.5, -0.5, 0.5),
    [200, 100, 50]
  ),
  // North
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(0.5, 0.5, 0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    [200, 100, 50]
  ),
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    new Vec3d(-0.5, -0.5, 0.5),
    [200, 100, 50]
  ),
  // West
  new Triangle(
    new Vec3d(-0.5, -0.5, 0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    new Vec3d(-0.5, 0.5, -0.5),
    [200, 100, 50]
  ),
  new Triangle(
    new Vec3d(-0.5, -0.5, 0.5),
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(-0.5, -0.5, -0.5),
    [200, 100, 50]
  ),
  // Top
  new Triangle(
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(-0.5, 0.5, 0.5),
    new Vec3d(0.5, 0.5, 0.5),
    [200, 100, 50]
  ),
  new Triangle(
    new Vec3d(-0.5, 0.5, -0.5),
    new Vec3d(0.5, 0.5, 0.5),
    new Vec3d(0.5, 0.5, -0.5),
    [200, 100, 50]
  ),
  // Bottom
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(-0.5, -0.5, 0.5),
    new Vec3d(-0.5, -0.5, -0.5),
    [200, 100, 50]
  ),
  new Triangle(
    new Vec3d(0.5, -0.5, 0.5),
    new Vec3d(-0.5, -0.5, -0.5),
    new Vec3d(0.5, -0.5, -0.5),
    [200, 100, 50]
  ),
]);
