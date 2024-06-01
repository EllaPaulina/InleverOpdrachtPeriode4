import { Actor, EdgeCollider, Vector, CollisionType } from "excalibur";

export class Border extends Actor {
  constructor() {
    super();
    let edge = new EdgeCollider({
      begin: new Vector(-1000, 450),
      end: new Vector(600, 450),
    });
    this.pos = new Vector(100, 500);
    this.body.collisionType = CollisionType.Fixed;
    this.collider.set(edge);
  }
}
