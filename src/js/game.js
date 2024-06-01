import "../css/style.css";
import { Engine, DisplayMode, SolverStrategy, Vector } from "excalibur";
import { Level } from "./level.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";
import { GameOver } from "./gameover.js";
import { Win } from "./win.js";
import { Intro } from "./intro.js";
import { ResourceLoader } from "./resources.js";

export class Game extends Engine {
  constructor() {
    super({
      width: 1280,
      height: 720,
      displayMode: DisplayMode.FitScreen,
      physics: { solver: SolverStrategy.Arcade, gravity: new Vector(0, 800) },
    });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    this.add("intro", new Intro());

    const ui = new UI();
    this.add(ui);
    const player = new Player();
    this.add(player);

    this.add("level", new Level());
    this.goToScene("intro");
    this.add("gameover", new GameOver());
    this.add("win", new Win());
  }
}

new Game();
