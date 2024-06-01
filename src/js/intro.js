import {
  Scene,
  Label,
  Font,
  FontUnit,
  Color,
  Actor,
  Vector,
  Keys,
} from "excalibur";
import { Background } from "./background";

export class Intro extends Scene {
  constructor() {
    super();
  }
  onInitialize(engine) {
    const background = new Background();
    background.pos = new Vector(550, 100);

    this.add(background);

    const gameTitle = new Label({
      text: "Cave Cat",
      pos: new Vector(75, 100),
      font: new Font({
        family: "impact",
        size: 48,
        unit: FontUnit.Px,
        color: Color.White,
      }),
    });
    gameTitle.graphics.anchor = new Vector(0.5, 0.5);
    this.add(gameTitle);

    const startGameLabel = new Label({
      text: "Press ENTER to Start",
      pos: new Vector(75, 200),
      font: new Font({
        family: "impact",
        size: 24,
        unit: FontUnit.Px,
        color: Color.White,
      }),
    });
    startGameLabel.graphics.anchor = new Vector(0.5, 0.5);
    this.add(startGameLabel);

    const instructions = new Label({
      text: "Use WASD or Directional Keys to move. Finish the game with the most health possible. Collect purple orb to win",
      pos: new Vector(75, 300),
      font: new Font({
        family: "impact",
        size: 18,
        unit: FontUnit.Px,
        color: Color.White,
      }),
    });
    instructions.graphics.anchor = new Vector(0.5, 0.5);
    this.add(instructions);

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Keys.Enter) {
        engine.goToScene("level");
      }
    });
  }
  onActivate() {
    this.engine.currentScene.camera.pos = new Vector(100, 200);
    this.engine.currentScene.camera.zoom = 1;
  }
}
