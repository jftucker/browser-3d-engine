import { Vec3d } from "./Vec3d.js";
import { Mat4x4 } from "./Mat4x4.js";
import { config } from "../config.js";

export class Mesh {
  constructor(
    tris = [],
    thetaX = 0,
    thetaY = 0,
    thetaZ = 0,
    translate = new Vec3d(0, 0, 0)
  ) {
    this.tris = tris;
    this.thetaX = thetaX;
    this.thetaY = thetaY;
    this.thetaZ = thetaZ;
    this.translate = translate;
  }

  processTris(rasterizer) {
    const camera = rasterizer.camera;
    this.tris.forEach(tri => {
      const triTransformed = tri.transform(this.worldMatrix);

      if (triTransformed.isVisibleTo(camera.position)) {
        triTransformed.lum = triTransformed
          .normal()
          .dot(rasterizer.light.normalize());

        const triViewed = triTransformed.transform(this.viewMatrix);

        const clippedAgainstView = triViewed.clipAgainstPlane({
          planePosition: new Vec3d(0, 0, config.ZNEAR),
          planeNormal: new Vec3d(...config.FORWARD_DIR),
        });

        clippedAgainstView.forEach(tri => {
          const triScaled = tri
            .transform(this.projectionMatrix)
            .scaleToView(config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

          rasterizer.pushToRasterQueue(triScaled);
        });
      }
    });
  }

  render(rasterizer) {
    const camera = rasterizer.camera;

    this.projectionMatrix = Mat4x4.makeProjection(
      config.FOV,
      config.CANVAS.HEIGHT / config.CANVAS.WIDTH,
      config.ZNEAR,
      config.ZFAR
    );

    this.worldMatrix = Mat4x4.makeIdentity()
      .matrixMult(Mat4x4.makeRotationX(this.thetaX))
      .matrixMult(Mat4x4.makeRotationY(this.thetaY))
      .matrixMult(Mat4x4.makeRotationZ(this.thetaZ))
      .matrixMult(Mat4x4.makeTranslation(this.translate));

    let target = new Vec3d(...config.FORWARD_DIR);

    camera.look(target);

    target = camera.position.add(camera.lookDir);

    const cameraMatrix = Mat4x4.PointAt(camera.position, target, camera.up);
    this.viewMatrix = Mat4x4.quickInverse(cameraMatrix);

    this.processTris(rasterizer);
  }
}
