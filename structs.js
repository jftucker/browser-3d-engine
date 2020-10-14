export class Vec3d {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Triangle {
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
  }
}

export class Mesh {
  constructor(tris) {
    this.tris = tris;
  }

  render() {
    this.tris.forEach(tri => console.log(tri));
  }
}

export class Mat4x4 {
  constructor(matrix) {
    this.matrix = matrix;
  }
}
