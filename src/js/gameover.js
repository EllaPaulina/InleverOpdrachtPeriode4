import "../css/style.css";
import { Scene, Label, FontUnit, Font, Vector, Color } from "excalibur";
import { Background } from "./background.js";

export class GameOver extends Scene {
  constructor() {
    super();
  }

  onInitialize(engine) {
    const background = new Background();
    background.pos = new Vector(550, 100);

    this.add(background);

    const label = new Label({
      text: "GAME OVER",
      pos: new Vector(50, 100),
      font: new Font({
        family: "impact",
        size: 48,
        unit: FontUnit.Px,
        color: Color.White,
      }),
      textAlign: "center",
      color: Color.White,
    });

    this.add(label);
  }

  onActivate() {
    this.engine.currentScene.camera.pos = new Vector(100, 200);
    this.engine.currentScene.camera.zoom = 1;
  }
}
