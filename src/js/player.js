import {
  Actor,
  SpriteSheet,
  Vector,
  Animation,
  range,
  Keys,
  CollisionType,
  DegreeOfFreedom,
  BoundingBox,
} from "excalibur";
import { Resources } from "./resources";
import { PlatformTileRectangle } from "./platformr";
import { PlatformTileSquare } from "./platforms";
import { Enemy } from "./enemy";
import { Power } from "./power";
import { Exit } from "./exit";
import { Border } from "./pit";
export class Player extends Actor {
  constructor() {
    super({
      width: 15,
      height: 33,
    });
    this.body.collisionType = CollisionType.Active;
    this.collisionCount = 0;
    this.maxCollisions = 3;

    const runSheet = SpriteSheet.fromImageSource({
      image: Resources.Player,
      grid: { rows: 10, columns: 8, spriteWidth: 32, spriteHeight: 33 },
    });

    const idle = Animation.fromSpriteSheet(runSheet, range(0, 3), 200); //idle animation
    const runLeft = Animation.fromSpriteSheet(runSheet, range(40, 47), 100); //run left animation
    const runRight = Animation.fromSpriteSheet(runSheet, range(40, 47), 100); //run right animation

    runLeft.flipHorizontal = true;

    this.graphics.add("idle", idle);
    this.graphics.add("runleft", runLeft);
    this.graphics.add("runright", runRight);

    this.graphics.use(idle);
    this.grounded = false;
  }

  onInitialize(engine) {
    this.pos = new Vector(-600, 200);
    this.vel = new Vector(0, 0);
    this.scale.setTo(3, 3);
    this.z = 1;

    this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
    this.body.mass = 15;

    this.on("collisionstart", (evt) => this.handleCollisionStart(evt));
    this.on("collisionend", (evt) => this.handleCollisionEnd(evt));
    this.on("collisionstart", (evt) => this.handleHitEnemy(evt));
    this.on("collisionstart", (evt) => this.handleTouchGreenOrb(evt));
    this.on("collisionstart", (evt) => this.handleTouchPurpleOrb(evt));
    this.on("collisionstart", (evt) => this.playerFall(evt));

    engine.currentScene.camera.strategy.lockToActor(this);
    engine.currentScene.camera.strategy.limitCameraBounds(
      new BoundingBox(-750, -550, 750, 550)
    );
  }

  handleCollisionStart(evt) {
    if (
      evt.other instanceof PlatformTileRectangle ||
      evt.other instanceof PlatformTileSquare
    ) {
      this.grounded = true;
    }
  }

  handleCollisionEnd(evt) {
    if (
      evt.other instanceof PlatformTileRectangle ||
      evt.other instanceof PlatformTileSquare
    ) {
      this.grounded = false;
    }
  }

  handleHitEnemy(evt) {
    if (evt.other instanceof Enemy) {
      this.collisionCount++;
      this.scene.hitEnemy();
      if (this.collisionCount >= this.maxCollisions) {
        this.scene.engine.goToScene("gameover");
        this.kill();
        //console.log("Player killed!");
      } else {
        //console.log(
        // `Player collided with enemy! Collision count: ${this.collisionCount}`
        //);
      }
    }
  }
  handleTouchGreenOrb(evt) {
    if (evt.other instanceof Power) {
      this.scene.hitOrb();
    }
  }

  handleTouchPurpleOrb(evt) {
    if (evt.other instanceof Exit) {
      this.scene.engine.goToScene("win");
    }
  }
  playerFall(evt) {
    if (evt.other instanceof Border) {
      this.kill();
      console.log("player fell to death");
      this.scene.engine.goToScene("gameover");
    }
  }

  onPreUpdate(engine) {
    this.graphics.use("idle");
    let xspeed = 0;

    if (
      engine.input.keyboard.isHeld(Keys.A) ||
      engine.input.keyboard.isHeld(Keys.Left)
    ) {
      xspeed = -300;
      this.graphics.use("runleft");
    }
    if (
      engine.input.keyboard.isHeld(Keys.D) ||
      engine.input.keyboard.isHeld(Keys.Right)
    ) {
      xspeed = 300;
      this.graphics.use("runright");
    }
    if (
      engine.input.keyboard.wasPressed(Keys.Up) ||
      engine.input.keyboard.wasPressed(Keys.W)
    ) {
      if (this.grounded) {
        this.body.applyLinearImpulse(new Vector(0, -5000));
        this.grounded = false;
      }
    }

    if (xspeed === 0 && this.grounded) {
      this.graphics.use("idle");
    }

    this.vel = new Vector(xspeed, this.vel.y);
  }
}
