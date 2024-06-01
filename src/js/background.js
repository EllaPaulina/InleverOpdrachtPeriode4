import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { PlatformTileSquare } from "./platforms";

export class Background extends Actor {
  constructor(x, y) {
    super({
      width: 1280,
      height: 720,
      pos: new Vector(x, y),
    });
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Background.toSprite());
    this.pos.y = 0;
    this.pos.x = 0;
    this.scale.setTo(3, 4);
    this.z = 0;
    this.body.collisionType = CollisionType.Passive;
  }

  createPlatforms() {
    const platformertiles = new PlatformTileSquare();
    this.addChild(platformertiles);
  }
}
