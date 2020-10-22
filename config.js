export const config = {
  INPUT: {
    KeyA: "moveLeft",
    Space: "moveUp",
    KeyD: "moveRight",
    ShiftLeft: "moveDown",
    KeyW: "moveForward",
    KeyS: "moveBackward",
  },
  VELOCITY: 0.3,
  MOUSE_INPUT_SCALING: {
    X: 1 / 500,
    Y: 1 / 400,
  },
  FORWARD_DIR: [0, 0, 1],
  UP_DIR: [0, -1, 0],
  FOV: 90,
  ZNEAR: 0.1,
  ZFAR: 1000,
  CANVAS: {
    WIDTH: window.innerWidth + 1,
    HEIGHT: window.innerHeight + 1,
  },
  CAMERA: {
    STARTING_POSITION: [59.8, 7.6, -36.5],
    STARTING_ORIENTATION: [0, 0, 0.89],
    STARTING_LOOK_DIRECTION: [-0.76, 0.29, 0.58],
  },
  MILLISECONDS_PER_FRAME: 1000 / 60,
  LIGHTS: {
    GLOBAL_LIGHT_SOURCE: [0.7, 0.3, 0],
  },
  COLORS: { SKY_LIGHT: "#65a6f0", SKY_DARK: "blue" },
};
