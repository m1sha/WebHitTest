import BaseBuilder from './BaseBuilder';

export default class PolygonBuilder extends BaseBuilder {

  isClosePath: boolean

  constructor(isClosePath: boolean = false) {
    super()
    this.isClosePath = isClosePath
  }

  build(): Path2D {
    const result = new Path2D()
    if (this.points.length < 2) {
      return result
    }
      
    const startPoint = this.points[0];
    result.moveTo(startPoint.x, startPoint.y)

    for (let i = 1; i < this.points.length; i++) {
      result.lineTo(this.points[i].x, this.points[i].y)
    }

    if (this.isClosePath || this.isClosed) {
      result.closePath()
    }

    return result
  }

  get isClosed(): boolean {
    if (this.points.length < 3) {
      return false
    }

    return this.points[0].x === this.points[this.points.length - 1].x &&
      this.points[0].y === this.points[this.points.length - 1].y
  }
}