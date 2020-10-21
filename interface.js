import { config } from "./config.js";

function handleKeyboard(e) {
  return e.type === "keydown";
}

function isKeyboard(e) {
  return e.type === "keydown" || e.type === "keyup";
}

function isMouse(e) {
  return e.type === "mousemove";
}

export function command(camera) {
  return e => {
    if (isKeyboard(e)) {
      camera[config.INPUT[e.code]] = handleKeyboard(e);
    } else if (isMouse(e)) {
      camera.rotate(e);
    }
  };
}
