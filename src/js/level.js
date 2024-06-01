import "../css/style.css";
import { Scene } from "excalibur";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Power } from "./power.js";
import { PlatformTileSquare } from "./platforms.js";
import { PlatformTileRectangle } from "./platformr.js";
import { Background } from "./background.js";
import { Exit } from "./exit.js";
import { UI } from "./ui.js";
import { Border } from "./pit.js";

export class Level extends Scene {
  constructor() {
    super();
  }

  onInitialize(engine) {
    console.log("lvl created");

    const background = new Background();
    this.add(background);

    const platformSquarePositions = [
      { x: -650, y: 450 },
      { x: -700, y: 100 },

      { x: -200, y: 450 },
      { x: 500, y: 450 },
    ];

    platformSquarePositions.forEach((pos) => {
      const squarePlatforms = new PlatformTileSquare(pos.x, pos.y);
      this.add(squarePlatforms);
      console.log("squarePlatforms added at", pos.x, pos.y);
    });

    const platformRectanglePositions = [
      { x: 150, y: 200, rotation: Math.PI / 2, move: true, moveRangeY: 200 },
      {
        x: 50,
        y: 200,
        rotation: Math.PI / 2,
        move: true,
        moveRangeY: 200,
      },
      {
        x: -425,
        y: 200,
        rotation: Math.PI / 2,
        move: true,
        moveRangeY: 200,
      },
      { x: 300, y: 100, rotation: 0, move: false },
      { x: 300, y: 300, rotation: 0, move: false },
    ];

    platformRectanglePositions.forEach((pos) => {
      const rectanglePlatforms = new PlatformTileRectangle(
        pos.x,
        pos.y,
        pos.rotation,
        pos.move,
        pos.moveRangeX,
        pos.moveRangeY
      );

      this.add(rectanglePlatforms);

      console.log(
        "rectanglePlatforms added at",
        pos.x,
        pos.y,
        "move:",
        pos.move,
        "with moveRangeX",
        pos.moveRangeX,
        "with moveRangeY",
        pos.moveRangeY
      );
    });

    const enemyPositions = [
      { x: 100, y: 100 },
      { x: -700, y: 0 },
    ];

    enemyPositions.forEach((pos) => {
      const enemy = new Enemy(pos.x, pos.y);
      this.add(enemy);
      console.log("enemy added at", pos.x, pos.y);
    });

    const powerPositions = [{ x: 300, y: -20 }];

    powerPositions.forEach((pos) => {
      const power = new Power(pos.x, pos.y);
      this.add(power);
      this.hitOrb = () => {
        ui.addHeart();
        power.removeOrb();
      };
      console.log("enemy added at", pos.x, pos.y);
    });
    const exit = new Exit(500, 300);
    this.add(exit);

    const border = new Border();
    this.add(border);
    const ui = new UI();
    this.add(ui);

    const player = new Player(-600, 200);
    this.add(player);

    this.hitEnemy = () => {
      ui.removeHeart();
    };
  }
}
