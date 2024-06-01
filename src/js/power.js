import "../css/style.css";
import {
  Actor,
  Vector,
  SpriteSheet,
  Animation,
  range,
  CollisionType,
} from "excalibur";
import { Resources } from "./resources.js";

export class Power extends Actor {
  constructor(x, y) {
    super({ width: 32, height: 32, pos: new Vector(x, y) });
    this.body.collisionType = CollisionType.Active;

    const runSheet = SpriteSheet.fromImageSource({
      image: Resources.Orb,
      grid: { rows: 8, columns: 4, spriteWidth: 32, spriteHeight: 32 },
    });

    const power = Animation.fromSpriteSheet(runSheet, range(8, 11), 300);

    this.graphics.add("power", power);
    this.graphics.use("power");
  }

  onInitialize(engine) {
    this.z = 2;
  }
  removeOrb() {
    this.kill();
  }
}
