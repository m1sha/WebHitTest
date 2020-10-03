export default class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(point: Point): Point {
    return new Point(point.x + this.x, point.y - this.y)
  }

  clone(): Point  {
    return new Point(this.x, this.y)
  }
}