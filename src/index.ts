import { Engine, DisplayMode, Color } from "excalibur";
import { Paddle } from "./objects/paddle";
import { Ball } from "./objects/ball";
import { Brick } from "./objects/brick";
import { VreakoutKeyDispatcher } from "./key";
import { Arranger, ArrangeInfo } from "./arranger";

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      displayMode: DisplayMode.FullScreen,
      backgroundColor: Color.Black
    });
  }
}

const game = new Game();

const paddle = new Paddle(game.drawWidth / 2, game.drawHeight - 40);
game.add(paddle);

const ball = new Ball(game.drawWidth / 2, game.drawHeight / 2, 800, 800);
ball.on("postupdate", () => {
  if (ball.getLeft() <= 0 && ball.vel.x < 0) {
    ball.vel.x *= -1;
  }

  if (ball.getRight() > game.drawWidth && ball.vel.x > 0) {
    ball.vel.x *= -1;
  }

  if (ball.getTop() <= 0 && ball.vel.y < 0) {
    ball.vel.y *= -1;
  }

  if (ball.getBottom() >= game.drawHeight && ball.vel.y > 0) {
    ball.vel.y *= -1;
  }
});
game.add(ball);

const colors = [Color.Red, Color.Chartreuse, Color.Yellow];
const rowLength = 18;
const rowCount = 4;
const width = 120;
const gapX = 60;
const height = 40;
const gapY = 40;
const initX = 50;
const initY = 100;
new Arranger()
  .setPosition((index: number, info: ArrangeInfo) => {
    return [
      initX + (index % rowLength) * (width + gapX),
      initY + Math.floor(index / rowLength) * (height + gapY)
    ];
  })
  .setColor((index: number, info: ArrangeInfo) => {
    return colors[index % colors.length];
  })
  .do(initX, initY, rowLength * rowCount)
  .map(info => {
    const color = info.color || Color.Chartreuse;
    const brick = new Brick(info.x, info.y, width, height, color);
    game.add(brick);
  });

const dispatcher = new VreakoutKeyDispatcher(game, paddle);
game.input.keyboard.on("hold", ev => {
  if (ev === undefined) {
    return;
  }

  dispatcher.dispatch(ev.key);
});

game.start();
