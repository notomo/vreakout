import { Engine, Input } from "excalibur";
import { Paddle } from "./objects/paddle";

type KeyMapper = { [index: number]: (key: Input.Keys) => void };

class KeyDispatcher {
  constructor(protected readonly keyMapper: KeyMapper) {}

  public dispatch(key: Input.Keys) {
    if (!(key in this.keyMapper)) {
      return;
    }
    this.keyMapper[key](key);
  }
}

export class VreakoutKeyDispatcher extends KeyDispatcher {
  constructor(
    protected readonly engine: Engine,
    protected readonly paddle: Paddle
  ) {
    super({
      [Input.Keys.H]: (key: Input.Keys) => {
        if (paddle.getLeft() <= 0) {
          return;
        }
        paddle.moveLeft();
      },
      [Input.Keys.L]: (key: Input.Keys) => {
        if (paddle.getRight() >= engine.canvasWidth) {
          return;
        }
        paddle.moveRight();
      },
      [Input.Keys.J]: (key: Input.Keys) => {
        if (paddle.getBottom() >= engine.canvasHeight) {
          return;
        }
        paddle.moveDown();
      },
      [Input.Keys.K]: (key: Input.Keys) => {
        if (paddle.getTop() <= 0) {
          return;
        }
        paddle.moveUp();
      },
    });
  }
}
