import Coord from '../Coord';
import Point from './Point';
import Rect from './Rect';
import Viewport from './Viewport';

export default class Shape {
  polygon: Point[]
  viewport: Viewport

  constructor(viewport: Viewport, points: Point[] = null) {
    this.polygon = points
    this.viewport = viewport
  }

  getBounds(): Rect {
    let
      minX = this.viewport.width,
      maxX = 0,
      minY = this.viewport.height,
      maxY = 0

    for (var i = 0; i < this.polygon.length; i++) {
      const point = Coord.toScreen(this.polygon[i], this.viewport)

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