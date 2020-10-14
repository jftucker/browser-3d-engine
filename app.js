document.addEventListener("DOMContentLoaded", () => {
  class Vec3d {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  class Triangle {
    constructor(p1, p2, p3) {
      this.points = [p1, p2, p3];
    }
  }

  class Mesh {
    constructor(tris) {
      this.tris = tris;
    }

    render() {
      this.tris.forEach(tri => console.log(tri));
    }
  }

  const cube = new Mesh([
    // South
    new Triangle(new Vec3d(0, 0, 0), new Vec3d(0, 1, 0), new Vec3d(1, 1, 0)),
    new Triangle(new Vec3d(0, 0, 0), new Vec3d(1, 1, 0), new Vec3d(1, 0, 0)),
    // East
    new Triangle(new Vec3d(1, 0, 0), new Vec3d(1, 1, 0), new Vec3d(1, 1, 1)),
    new Triangle(new Vec3d(1, 0, 0), new Vec3d(1, 1, 0), new Vec3d(1, 1, 1)),
    // North
    new Triangle(new Vec3d(1, 0, 1), new Vec3d(1, 1, 1), new Vec3d(0, 1, 1)),
    new Triangle(new Vec3d(1, 0, 1), new Vec3d(0, 1, 1), new Vec3d(0, 0, 1)),
    // West
    new Triangle(new Vec3d(0, 0, 1), new Vec3d(0, 1, 1), new Vec3d(0, 1, 0)),
    new Triangle(new Vec3d(0, 0, 1), new Vec3d(0, 1, 0), new Vec3d(0, 0, 0)),
    // Top
    new Triangle(new Vec3d(0, 1, 0), new Vec3d(0, 1, 1), new Vec3d(1, 1, 1)),
    new Triangle(new Vec3d(0, 1, 0), new Vec3d(1, 1, 1), new Vec3d(1, 1, 0)),
    // Bottom
    new Triangle(new Vec3d(1, 0, 1), new Vec3d(0, 0, 1), new Vec3d(0, 0, 0)),
    new Triangle(new Vec3d(1, 0, 1), new Vec3d(0, 0, 0), new Vec3d(1, 0, 0)),
  ]);

  cube.render();
});
