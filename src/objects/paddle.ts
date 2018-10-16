import { Actor, Color, CollisionType } from "excalibur";

export class Paddle extends Actor {
  protected readonly unitX = 10;

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 200,
      height: 20,
      color: Color.Chartreuse,
      collisionType: CollisionType.Fixed
    });
  }

  public moveRight() {
    this.x += this.unitX;
  }

  public moveLeft() {
    this.x -= this.unitX;
  }
}
