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
      collisionType: CollisionType.Passive
    });

    this.vel.setTo(velX, velY);

    this.on("precollision", ev => {
      if (ev === undefined) {
        return;
      }

      const intersection = ev.intersection.normalize();
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
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
