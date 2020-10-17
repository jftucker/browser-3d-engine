import { Vec3d } from "./structs.js";

export class Camera {
  constructor(x, y, z, roll = 0, pitch = 0, yaw = 0) {
    this.position = new Vec3d(x, y, z);
    this.roll = roll;
    this.pitch = pitch;
    this.yaw = yaw;
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.yawLeft = false;
    this.yawRight = false;
    this.moveForward = false;
    this.moveBackward = false;
    this.lookDir = new Vec3d(0, 0, 1);
  }
  update() {
    if (this.moveUp) {
      this.position.y += 0.5;
    }
    if (this.moveDown) {
      this.position.y -= 0.5;
    }
    if (this.moveLeft) {
      this.position.x += 0.5;
    }
    if (this.moveRight) {
      this.position.x -= 0.5;
    }
    if (this.yawLeft) {
      this.yaw -= 0.1;
    }
    if (this.yawRight) {
      this.yaw += 0.1;
    }
    if (this.moveForward) {
      this.position = this.position.add(this.lookDir.mul(0.5));
    }
    if (this.moveBackward) {
      this.position = this.position.sub(this.lookDir.mul(0.5));
    }
  }
}
