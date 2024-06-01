import {
  ScreenElement,
  Actor,
  Vector,
  Label,
  Font,
  FontUnit,
  Color,
} from "excalibur";
import { Resources } from "./resources.js";

export class UI extends ScreenElement {
  constructor() {
    super();

    this.hearts = [];
    this.heartLimit = 3;
    this.score = this.heartLimit * 100;
  }

  onInitialize(engine) {
    for (let i = 0; i < this.heartLimit; i++) {
      const heart = new Actor();
      heart.graphics.use(Resources.Heart.toSprite());
      heart.pos = new Vector(10 + i * 30, 20);
      this.hearts.push(heart);
      this.addChild(heart);
      heart.scale.setTo(2, 2);
    }

    this.scoreLabel = new Label({
      text: `Score: ${this.score}`,
      pos: new Vector(engine.drawWidth - 150, 20),
      font: new Font({
        family: "Arial",
        size: 24,
        unit: FontUnit.Px,
        color: Color.White,
      }),
    });
    this.addChild(this.scoreLabel);
  }

  updateScore() {
    this.score = this.hearts.length * 100;
    this.scoreLabel.text = `Score: ${this.score}`;
  }

  removeHeart() {
    if (this.hearts.length > 0) {
      const heartToRemove = this.hearts.pop();
      this.removeChild(heartToRemove);
      //console.log("Heart removed:", heartToRemove);
      this.updateScore();
    } else {
      //console.log("No hearts left to remove");
    }
  }

  addHeart() {
    if (this.hearts.length < this.heartLimit) {
      const newHeart = new Actor();
      newHeart.graphics.use(Resources.Heart.toSprite());
      const lastHeart = this.hearts[this.hearts.length - 1];
      newHeart.pos = new Vector(lastHeart.pos.x + 30, lastHeart.pos.y);
      this.hearts.push(newHeart);
      this.addChild(newHeart);
      this.updateScore();
    }
  }
}
