import { Vec3d } from "./structs.js";

const VELOCITY = 0.3;

export class Camera {
  constructor(x, y, z, roll = 0, pitch = 0, yaw = 0) {
    this.position = new Vec3d(x, y, z);
    this.roll = roll;
    this.pitch = pitch;
    this.yaw = yaw;
    this.lookDir = new Vec3d(0, 0, 1);
    this.up = new Vec3d(0, -1, 0);
    this.target = new Vec3d(0, 0, 1);
  }
  rotate(e) {
    this.yaw += e.movementX / 500;
    if (Math.abs(this.pitch + e.movementY / 400) < Math.PI / 2) {
      this.pitch += e.movementY / 400;
    }
  }
  update() {
    if (this.moveUp) {
      this.position.y += VELOCITY;
    }
    if (this.moveDown) {
      this.position.y -= VELOCITY;
    }
    if (this.moveLeft) {
      this.position = this.position.add(
        this.lookDir
          .cross(this.up)
          .normalize()
          .mult(VELOCITY)
      );
    }
    if (this.moveRight) {
      this.position = this.position.sub(
        this.lookDir
          .cross(this.up)
          .normalize()
          .mult(VELOCITY)
      );
    }
    if (this.moveForward) {
      this.position = this.position.add(this.lookDir.mult(VELOCITY));
    }
    if (this.moveBackward) {
      this.position = this.position.sub(this.lookDir.mult(VELOCITY));
    }
  }
}
