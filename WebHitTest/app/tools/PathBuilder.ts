﻿import Point from './Point';

export default abstract class PathBuilder {
  protected points: Point[]

  constructor() {
    this.points = []
  }

  addPoint(point: Point, center: Point = null) {
    if (!center)
      this.points.push(point)
    else
      this.points.push(point.add(center))

    return this
  }

  addPointBulk(points: Point[], center: Point = null) {
    for (var i = 0; i < points.length; i++) {
      this.addPoint(points[i], center)
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