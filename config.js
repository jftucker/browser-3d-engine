export const config = {
  KEYMAP: {
    A: 65,
    S: 83,
    D: 68,
    W: 87,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    LSHIFT: 16,
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
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight - 50,
  },
};
