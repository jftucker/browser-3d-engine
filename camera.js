import { Vec3d } from "./structures/Vec3d.js";
import { config } from "./config.js";

export class Camera {
  constructor(x, y, z, roll = 0, pitch = 0, yaw = 0) {
    this.position = new Vec3d(x, y, z);
    this.roll = roll;
    this.pitch = pitch;
    this.yaw = yaw;
    this.lookDir = new Vec3d(...config.FORWARD_DIR);
    this.up = new Vec3d(...config.UP_DIR);
    this.target = new Vec3d(...config.FORWARD_DIR);
  }
  rotate(e) {
    this.yaw += e.movementX * config.MOUSE_INPUT_SCALING.X;
    if (
      Math.abs(this.pitch + e.movementY * config.MOUSE_INPUT_SCALING.Y) <
      Math.PI / 2
    ) {
      this.pitch += e.movementY * config.MOUSE_INPUT_SCALING.Y;
    }
  }
  update() {
    if (this.moveUp) {
      this.position.y += config.VELOCITY;
    }
    if (this.moveDown) {
      this.position.y -= config.VELOCITY;
    }
    if (this.moveLeft) {
      this.position = this.position.add(
        this.lookDir
          .cross(this.up)
          .normalize()
          .mult(config.VELOCITY)
      );
    }
    if (this.moveRight) {
      this.position = this.position.sub(
        this.lookDir
          .cross(this.up)
          .normalize()
          .mult(config.VELOCITY)
      );
    }
    if (this.moveForward) {
      this.position = this.position.add(this.lookDir.mult(config.VELOCITY));
    }
    if (this.moveBackward) {
      this.position = this.position.sub(this.lookDir.mult(config.VELOCITY));
    }
  }
}
