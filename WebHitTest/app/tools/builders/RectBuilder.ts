import Point from '../primitive/Point';
import Rect from '../primitive/Rect';
import BaseBuilder from './BaseBuilder';

export default class RectBuilder extends BaseBuilder {

  constructor(rect: Rect) {
    super()
    this.addPoint(new Point(rect.x, rect.y))
    this.addPoint(new Point(rect.width, rect.height))
  }

  build(): Path2D {
    const result = new Path2D()
    if (this.points.length < 2) {
      return result
    }

    result.rect(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y)
    return result
  }
}