import { Actor, Color, CollisionType } from "excalibur";

export class Paddle extends Actor {
  protected readonly unit = 10;

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 200,
      height: 20,
      color: Color.Chartreuse,
      collisionType: CollisionType.Fixed,
    });
  }

  public moveRight() {
    this.x += this.unit;
  }

  public moveLeft() {
    this.x -= this.unit;
  }

  public moveDown() {
    this.y += this.unit;
  }

  public moveUp() {
    this.y -= this.unit;
  }
}
