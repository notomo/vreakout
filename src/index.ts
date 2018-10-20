import { Engine, DisplayMode, Color } from "excalibur";
import { Paddle } from "./objects/paddle";
import { Ball } from "./objects/ball";
import { VreakoutKeyDispatcher } from "./key";

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
  if (ball.pos.x < ball.getWidth() / 2) {
    ball.vel.x *= -1;
  }

  if (ball.pos.x + ball.getWidth() / 2 > game.drawWidth) {
    ball.vel.x *= -1;
  }

  if (ball.pos.y < ball.getHeight() / 2) {
    ball.vel.y *= -1;
  }

  if (ball.pos.y + ball.getHeight() / 2 > game.drawHeight) {
    ball.vel.y *= -1;
  }
});
game.add(ball);

const dispatcher = new VreakoutKeyDispatcher(game, paddle);
game.input.keyboard.on("hold", ev => {
  if (ev === undefined) {
    return;
  }

  dispatcher.dispatch(ev.key);
});

game.start();
