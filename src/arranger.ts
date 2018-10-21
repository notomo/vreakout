import { Color } from "excalibur";

export interface ArrangeInfo {
  x: number;
  y: number;
  width: number | null;
  height: number | null;
  color: Color | null;
}

type ArrangeFunc<T> = (index: number, info: ArrangeInfo) => T;

export class Arranger {
  protected positionFunc: null | ArrangeFunc<[number, number]>;
  protected colorFunc: null | ArrangeFunc<Color>;

  constructor() {
    this.positionFunc = null;
    this.colorFunc = null;
  }

  public do(x: number, y: number, count: number): ArrangeInfo[] {
    const results: ArrangeInfo[] = [];

    let currentX = x;
    let currentY = y;
    let currentColor = null;
    for (let index = 0; index < count; index++) {
      let info: ArrangeInfo = {
        x: currentX,
        y: currentY,
        width: null,
        height: null,
        color: currentColor
      };

      if (this.positionFunc !== null) {
        const [newX, newY] = this.positionFunc(index, info);
        info.x = newX;
        info.y = newY;
        currentX = newX;
        currentY = newY;
      }

      if (this.colorFunc !== null) {
        const newColor = this.colorFunc(index, info);
        info.color = newColor;
        currentColor = newColor;
      }

      results.push(info);
    }

    return results;
  }

  public setPosition(func: ArrangeFunc<[number, number]>): this {
    this.positionFunc = func;
    return this;
  }

  public setColor(func: ArrangeFunc<Color>): this {
    this.colorFunc = func;
    return this;
  }
}
