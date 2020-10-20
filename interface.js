import { config } from "./config.js";
function isPressed(e) {
  return e.type === "keydown";
}

const INPUT = {
  [config.KEYMAP.A]: "moveLeft",
  [config.KEYMAP.SPACE]: "moveUp",
  [config.KEYMAP.D]: "moveRight",
  [config.KEYMAP.SHIFT]: "moveDown",
  [config.KEYMAP.W]: "moveForward",
  [config.KEYMAP.S]: "moveBackward",
};

export function command(camera) {
  return e => {
    if (e.type === "keydown" || e.type === "keyup") {
      camera[INPUT[e.keyCode]] = isPressed(e);
    } else if (e.type === "mousemove") {
      camera.rotate(e);
    }
  };
}
