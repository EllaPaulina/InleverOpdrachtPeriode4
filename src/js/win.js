import "../css/style.css";
import { Scene, Label, FontUnit, Font, Vector, Color } from "excalibur";
import { Background } from "./background.js";

export class Win extends Scene {
  constructor() {
    super();
  }

  onInitialize(engine) {
    const background = new Background();
    background.pos = new Vector(550, 100); // Center background
    this.add(background);

    const label = new Label({
      text: "YOU WIN",
      pos: new Vector(50, 100),
      font: new Font({
        family: "impact",
        size: 48, // Adjust size if needed
        unit: FontUnit.Px,
        color: Color.White, // Set text color to white
      }),
      textAlign: "center", // Center the text horizontally
      color: Color.White, // Ensure the text color is white
    });
    label.anchor.setTo(0.5, 0.5); // Center the label's position
    this.add(label);
  }
  onActivate() {
    // On scene activation, ensure the camera is reset
    this.engine.currentScene.camera.pos = new Vector(100, 200);
    this.engine.currentScene.camera.zoom = 1;
  }
}
