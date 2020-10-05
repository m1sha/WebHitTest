import Point from './primitive/Point';
import Viewport from './primitive/Viewport';

export default class Coord {
  static fromScreen(x: number, y: number, viewport: Viewport): Point {
    return new Point(x - viewport.center.x, viewport.height - y - viewport.center.y)
  }

  static toScreen(point: Point, viewport: Viewport): Point {
    return new Point(point.x + viewport.center.x, viewport.center.y - point.y)
  }
}