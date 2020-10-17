import { Vec3d } from "./structs.js";

export class Camera {
  constructor(x, y, z) {
    this.position = new Vec3d(x, y, z);
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  }
  update() {
    if (this.moveUp) {
      this.position.y += 1;
    }
    if (this.moveDown) {
      this.position.y -= 1;
    }
    if (this.moveLeft) {
      this.position.x += 1;
    }
    if (this.moveRight) {
      this.position.x -= 1;
    }
  }
}
