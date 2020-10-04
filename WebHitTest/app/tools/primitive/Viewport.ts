import Point from "./Point";
import Rect from './Rect';
export default class Viewport extends Rect {
  center: Point;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height)
    this.center = new Point((width - x) / 2, (height - y) / 2)
  }

  get bounds(): any {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
}