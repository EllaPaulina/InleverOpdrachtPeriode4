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

export class Enemy extends Actor {
  constructor(x, y, travelDistance = 96) {
    super({
      width: 36,
      height: 35,
      pos: new Vector(x, y),
    });
    this.body.collisionType = CollisionType.Active;
    this.startingPos = new Vector(x, y);
    this.travelDistance = travelDistance;

    const runSheet = SpriteSheet.fromImageSource({
      image: Resources.Enemy,
      grid: { rows: 1, columns: 5, spriteWidth: 36, spriteHeight: 35 },
    });

    const walk = Animation.fromSpriteSheet(runSheet, range(1, 4), 300);

    this.graphics.add("walk", walk);
    this.graphics.use("walk");

    this.vel = new Vector(20, 0);
  }

  onInitialize(engine) {
    this.z = 2;
  }

  onPreUpdate(engine) {
    const distanceTravelled = this.pos.x - this.startingPos.x;

    if (distanceTravelled > this.travelDistance / 2) {
      // console.log("Moving left");
      this.graphics.use("walk").flipHorizontal = true;
      this.vel.x = -20;
    }

    if (distanceTravelled < -this.travelDistance / 2) {
      //console.log("Moving right");
      this.graphics.use("walk").flipHorizontal = false;
      this.vel.x = 20;
    }
  }
}
