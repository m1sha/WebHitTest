import Point from './Point';
import Rect from './Rect';
import Viewport from './Viewport';

export default class Shape {
  polygon: Point[]

  constructor(points: Point[] = null) {
    this.polygon = points
  }

  getBounds(viewport: Viewport): Rect {
    let
      minX = viewport.width,
      maxX = 0,
      minY = viewport.height,
      maxY = 0

    for (var i = 0; i < this.polygon.length; i++) {
      const point = this.polygon[i].add(viewport.center)

      if (minX > point.x)
        minX = point.x
      if (maxX < point.x)
        maxX = point.x

      if (minY > point.y)
        minY = point.y
      if (maxY < point.y)
        maxY = point.y
    }

    const width = Math.abs(maxX - minX)
    const height = Math.abs(maxY - minY)

    return new Rect(minX - 2, minY - 2, width + 2, height + 2)
  }

}