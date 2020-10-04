import BaseBuilder from './BaseBuilder'

export default class LineBuilder extends BaseBuilder {
  build(): Path2D {
    const result = new Path2D()
    if (this.points.length < 2) {
      return result
    }

    result.moveTo(this.points[0].x, this.points[0].y)
    result.lineTo(this.points[1].x, this.points[1].y)

    return result
  }
}