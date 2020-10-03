import Point from './Point';

export default class Shape {
  polygon: Point[]

  constructor(points: Point[] = null) {
    this.polygon = points
  }
}