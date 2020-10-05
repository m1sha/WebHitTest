import Point from '../primitive/Point';

export default abstract class BaseBuilder {
  protected points: Point[]

  constructor() {
    this.points = []
  }

  addPoint(point: Point) {
    this.points.push(point)
    return this
  }

  addPointBulk(points: Point[]) {
    for (var i = 0; i < points.length; i++) {
      this.addPoint(points[i])
    }

    return this
  }

  remove(i: number) {
    this.points.splice(i, 1)
  }

  abstract build(): Path2D

  toPoints(): Point[] {
    return this.points
  }
}