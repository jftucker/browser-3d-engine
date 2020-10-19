import { KEYMAP } from "./config.js";
function isPressed(e) {
  return e.type === "keydown";
}

export function command(camera) {
  return e => {
    if (e.keyCode === KEYMAP.A) {
      camera.moveLeft = isPressed(e);
    } else if (e.keyCode === KEYMAP.UP) {
      camera.moveUp = isPressed(e);
    } else if (e.keyCode === KEYMAP.D) {
      camera.moveRight = isPressed(e);
    } else if (e.keyCode === KEYMAP.DOWN) {
      camera.moveDown = isPressed(e);
    } else if (e.keyCode === KEYMAP.W) {
      camera.moveForward = isPressed(e);
    } else if (e.keyCode === KEYMAP.S) {
      camera.moveBackward = isPressed(e);
    } else if (e.type === "mousemove") {
      camera.rotate(e);
    }
  };
}
