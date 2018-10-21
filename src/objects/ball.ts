import { Actor, Color, CollisionType } from "excalibur";

export class Ball extends Actor {
  protected static readonly RADIUS = 10;

  constructor(x: number, y: number, velX: number, velY: number) {
    super({
      x: x,
      y: y,
      width: Ball.RADIUS * 2,
      height: Ball.RADIUS * 2,
      color: Color.Chartreuse,
      collisionType: CollisionType.Passive,
    });

    this.vel.setTo(velX, velY);

    this.on("precollision", ev => {
      if (ev === undefined) {
        return;
      }

      const intersection = ev.intersection.normalize();
      const other = ev.other;

      const inRangeY = other.getTop() <= this.y && this.y <= other.getBottom();
      if (Math.abs(intersection.x) > 0 && inRangeY) {
        if (
          other.x < this.x &&
          this.getLeft() <= other.getRight() &&
          this.vel.x < 0
        ) {
          // ball left collision
          this.vel.x *= -1;
        } else if (
          other.x > this.x &&
          this.getRight() >= other.getLeft() &&
          this.vel.x > 0
        ) {
          // ball right collision
          this.vel.x *= -1;
        }
      }

      const inRangeX = other.getLeft() <= this.x && this.x <= other.getRight();
      if (Math.abs(intersection.y) > 0 && inRangeX) {
        if (
          other.y < this.y &&
          this.getTop() <= other.getBottom() &&
          this.vel.y < 0
        ) {
          // ball top collision
          this.vel.y *= -1;
        } else if (
          other.y > this.y &&
          this.getBottom() >= other.getTop() &&
          this.vel.y > 0
        ) {
          // ball bottom collision
          this.vel.y *= -1;
        }
      }
    });
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, Ball.RADIUS, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
