import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources.js";
import { Enemy } from "./enemy.js";

export class PlatformTileRectangle extends Actor {
  constructor(
    x,
    y,
    rotation = 0,
    move = false,
    moveRangeX = 0,
    moveRangeY = 0
  ) {
    super({ width: 32, height: 96, pos: new Vector(x, y) });
    this.rotation = rotation; // Set rotation here in the constructor
    this.move = move; // Should this platform move?
    this.moveRangeX = moveRangeX; // Movement range along the x-axis
    this.moveRangeY = moveRangeY; // Movement range along the y-axis
    this.startPos = new Vector(x, y); // Keep track of the start position

    // Set initial velocity based on the move parameter
    if (move && moveRangeX > 0) {
      this.vel = new Vector(40, 0);
    } else if (move && moveRangeY > 0) {
      this.vel = new Vector(0, 40);
    } else {
      this.vel = new Vector(0, 0);
    }
  }

  onInitialize(engine) {
    this.graphics.use(Resources.PlatformTileRectangle.toSprite());
    this.scale.setTo(2, 2);
    this.z = 1;
    this.body.collisionType = CollisionType.Fixed;

    // Set initial direction
    this.movingRight = true;
    this.movingDown = true;
  }

  onPostUpdate(engine) {
    if (this.move) {
      const leftBound = this.startPos.x - this.moveRangeX;
      const rightBound = this.startPos.x + this.moveRangeX;
      const upperBound = this.startPos.y - this.moveRangeY;
      const lowerBound = this.startPos.y + this.moveRangeY;

      if (this.movingRight && this.pos.x > rightBound) {
        this.movingRight = false;
        this.vel.x = -40; // Move left
      }

      if (!this.movingRight && this.pos.x < leftBound) {
        this.movingRight = true;
        this.vel.x = 40; // Move right
      }

      if (this.movingDown && this.pos.y > lowerBound) {
        this.movingDown = false;
        this.vel.y = -40; // Move up
      }

      if (!this.movingDown && this.pos.y < upperBound) {
        this.movingDown = true;
        this.vel.y = 40; // Move down
      }
    }
  }
  //Inside PlatformTileRectangle class
  addEnemy(enemy) {
    this.addChild(enemy);
  }
}
