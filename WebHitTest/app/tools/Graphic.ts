import Point from "./primitive/Point"
import Viewport from "./primitive/Viewport"
import PolygonBuilder from './builders/PolygonBuilder'
import Shape from './primitive/Shape'
import RectBuilder from './builders/RectBuilder'
import Coord from './Coord'
import PenStyleResolver from './primitive/styles/PenStyleResolver'
import { DefaultPenStyle, DrawPathPenStyle, SelectFramPenStyle } from './primitive/styles/PenStyle'
import BrushStyleResolver from './primitive/styles/BrushStyleResolver'
import { BackgroundBrushStyle, DefaultBrushStyle } from './primitive/styles/BrushStyle'
import LabelResolver from './primitive/styles/LabelResolver'
import Metric from './Metric'
export default class Graphic {

  private ctx: CanvasRenderingContext2D
  private _viewport: Viewport
  private penStyleResolver: PenStyleResolver
  private brushStyleResolver: BrushStyleResolver
  private labelResolver: LabelResolver
  private metric: Metric

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    this.ctx.imageSmoothingEnabled = true
    this._viewport = new Viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.penStyleResolver = new PenStyleResolver()
    this.brushStyleResolver = new BrushStyleResolver()
    this.labelResolver = new LabelResolver()
    this.metric = new Metric(20, this.ctx, this.penStyleResolver, this.brushStyleResolver, this.labelResolver)
  }

  drawShape(shape: Shape) {
    if (shape.polygon) {
      const path = this.drawPolygon(shape.polygon)
      this.penStyleResolver.resolve(this.ctx, new DefaultPenStyle(path))
      this.brushStyleResolver.resolve(this.ctx, new DefaultBrushStyle(path))
    }
  }

  drawPath(points: Point[]) {
    const path = new PolygonBuilder()
      .addPointBulk(points.map(p => Coord.toScreen(p, this._viewport)))
      .build()

    this.penStyleResolver.resolve(this.ctx, new DrawPathPenStyle(path))
  }

  selectShape(shape: Shape) {
    const rect = shape.getBounds()
    const path = new RectBuilder(rect)
      .build()

    this.penStyleResolver.resolve(this.ctx, new SelectFramPenStyle(path))
  }

  clear(shapes: Shape[] = null) {
    const path = new RectBuilder(this._viewport.bounds)
      .build()
    this.brushStyleResolver.resolve(this.ctx, new BackgroundBrushStyle(path))
    this.metric.drawGrid(this._viewport)
    this.metric.drawCoordCross(this._viewport)
    if (shapes) {
      for (let i = 0; i < shapes.length; i++) {
        this.drawShape(shapes[i])
      }
    }
  }

  private drawPolygon(points: Point[]): Path2D {
    if (!points)
      throw new Error("ArgumentNullException:strokePolygon.points")
    if (points.length < 3)
      throw new Error("Through less than 3 points impossible to create polygon")

    return new PolygonBuilder(true)
      .addPointBulk(points.map(p => Coord.toScreen(p, this._viewport)))
      .build()
  }
  
  get viewport(): Viewport {
    return this._viewport
  }
}