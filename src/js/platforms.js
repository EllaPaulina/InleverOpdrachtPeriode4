import "../css/style.css";
import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class PlatformTileSquare extends Actor {
  constructor(x, y) {
    super({ width: 96, height: 96, pos: new Vector(x, y) });
  }

  onInitialize(engine) {
    this.graphics.use(Resources.PlatformTileSquare.toSprite());
    this.scale.setTo(2, 2);
    this.z = 1;

    //set collision type
    this.body.collisionType = CollisionType.Fixed;
  }
  // Inside PlatformTileRectangle class
  addEnemy(enemy) {
    this.addChild(enemy);
  }
}
