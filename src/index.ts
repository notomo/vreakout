import { Engine, DisplayMode, Color, Input } from "excalibur";
import { Paddle } from "./objects/paddle";

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

game.input.keyboard.on("hold", ev => {
  if (ev === undefined) {
    return;
  }

  const key = ev.key;
  if (key === Input.Keys.H) {
    paddle.moveLeft();
  } else if (key === Input.Keys.L) {
    paddle.moveRight();
  }
});

game.start();
