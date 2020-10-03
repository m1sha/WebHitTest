import Point from "./Point";
export default class Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
  center: Point;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
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