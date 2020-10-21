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

  render({ camera, light, trisToRaster }) {
    const projection = Mat4x4.makeProjection(
      config.FOV,
      config.CANVAS.HEIGHT / config.CANVAS.WIDTH,
      config.ZNEAR,
      config.ZFAR
    );

    const worldMatrix = Mat4x4.makeIdentity()
      .matrixMult(Mat4x4.makeRotationX(this.thetaX))
      .matrixMult(Mat4x4.makeRotationY(this.thetaY))
      .matrixMult(Mat4x4.makeRotationZ(this.thetaZ))
      .matrixMult(Mat4x4.makeTranslation(this.translate));

    let target = new Vec3d(...config.FORWARD_DIR);

    camera.look(target);

    target = camera.position.add(camera.lookDir);

    const matCamera = Mat4x4.PointAt(camera.position, target, camera.up);
    const matView = Mat4x4.quickInverse(matCamera);

    this.tris.forEach(tri => {
      const triTransformed = tri.transform(worldMatrix);

      if (triTransformed.isVisibleTo(camera.position)) {
        const lum = triTransformed.normal().dot(light.normalize());

        const triViewed = triTransformed.transform(matView);

        const clippedAgainstView = triViewed.clipAgainstPlane({
          planePosition: new Vec3d(0, 0, config.ZNEAR),
          planeNormal: new Vec3d(...config.FORWARD_DIR),
        });

        clippedAgainstView.forEach(tri => {
          const triScaled = tri
            .transform(projection)
            .scaleToView(config.CANVAS.WIDTH, config.CANVAS.HEIGHT);

          const queue = [triScaled];
          const screenEdgePlanes = [
            {
              planePosition: new Vec3d(0, 0, 0),
              planeNormal: new Vec3d(0, 1, 0),
            },
            {
              planePosition: new Vec3d(0, config.CANVAS.HEIGHT - 1, 0),
              planeNormal: new Vec3d(0, -1, 0),
            },
            {
              planePosition: new Vec3d(0, 0, 0),
              planeNormal: new Vec3d(1, 0, 0),
            },
            {
              planePosition: new Vec3d(config.CANVAS.WIDTH - 1, 0, 0),
              planeNormal: new Vec3d(-1, 0, 0),
            },
          ];

          screenEdgePlanes.forEach(plane => {
            queue.forEach(_ => {
              queue.push(...queue.shift().clipAgainstPlane(plane));
            });
          });

          queue.forEach(tri => {
            tri.lum = lum;

            trisToRaster.push(tri);
          });
        });
      }
    });
  }
}