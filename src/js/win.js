import "../css/style.css";
import { Scene, Label, FontUnit, Font, Vector, Color } from "excalibur";
import { Background } from "./background.js";

export class Win extends Scene {
  constructor() {
    super();
  }

  onInitialize(engine) {
    const background = new Background();
    background.pos = new Vector(550, 100);
    this.add(background);

    const label = new Label({
      text: "YOU WIN",
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
    label.anchor.setTo(0.5, 0.5);
    this.add(label);
    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Keys.Enter) {
        engine.goToScene("intro");
      }
    });
  }
  onActivate() {
    this.engine.currentScene.camera.pos = new Vector(100, 200);
    this.engine.currentScene.camera.zoom = 1;
  }
}
