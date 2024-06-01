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

export class Exit extends Actor {
  constructor(x, y) {
    super({ width: 32, height: 35, pos: new Vector(x, y) });
    this.body.collisionType = CollisionType.Active;

    const runSheet = SpriteSheet.fromImageSource({
      image: Resources.Orb,
      grid: { rows: 8, columns: 4, spriteWidth: 32, spriteHeight: 32 },
    });

    const exit = Animation.fromSpriteSheet(runSheet, range(16, 19), 300);

    this.graphics.add("exit", exit);
    this.graphics.use("exit");
  }

  onInitialize(engine) {
    this.z = 2;
  }
}
