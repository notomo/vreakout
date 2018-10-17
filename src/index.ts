import { Engine, DisplayMode, Color } from "excalibur";
import { Paddle } from "./objects/paddle";
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

const dispatcher = new VreakoutKeyDispatcher(game, paddle);
game.input.keyboard.on("hold", ev => {
  if (ev === undefined) {
    return;
  }

  dispatcher.dispatch(ev.key);
});

game.start();
