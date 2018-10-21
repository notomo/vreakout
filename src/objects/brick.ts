import { Actor, Color, CollisionType } from "excalibur";

export class Brick extends Actor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      color: color,
      collisionType: CollisionType.Fixed
    });
  }
}
