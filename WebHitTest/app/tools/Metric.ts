import LineBuilder from './builders/LineBuilder'
import Colors from './Colors'
import Coord from './Coord'
import Label from './primitive/Label'
import Point from './primitive/Point'
import BrushStyleResolver from './primitive/styles/BrushStyleResolver'
import { DefaultFontStyle, FontStyle } from './primitive/styles/FontStyle'
import LabelResolver from './primitive/styles/LabelResolver'
import { DefaultPenStyle } from './primitive/styles/PenStyle'
import PenStyleResolver from './primitive/styles/PenStyleResolver'
import Viewport from './primitive/Viewport'

export default class Metric {

  private cellCount: number
  private ctx: CanvasRenderingContext2D
  private penStyleResolver: PenStyleResolver
  private brushStyleResolver: BrushStyleResolver
  private labelResolver: LabelResolver

  constructor(cellCount: number, ctx: CanvasRenderingContext2D, penStyleResolver: PenStyleResolver, brushStyleResolver: BrushStyleResolver, labelResolver: LabelResolver) {
    this.cellCount = cellCount
    this.ctx = ctx
    this.penStyleResolver = penStyleResolver
    this.brushStyleResolver = brushStyleResolver
    this.labelResolver = labelResolver
  }

  drawCoordCross(viewport: Viewport) {
    const penStyle = new DefaultPenStyle(null)
    penStyle.strokeStyle = Colors.CoordCrossColor

    const lineX = this.drawLine(viewport, new Point(-viewport.center.x, 0), new Point(viewport.center.x, 0))
    const lineY = this.drawLine(viewport, new Point(0, -viewport.center.y), new Point(0, viewport.center.y))
    this.penStyleResolver.resolve(this.ctx, penStyle, _ => this.ctx.stroke(lineX))
    this.penStyleResolver.resolve(this.ctx, penStyle, _ => this.ctx.stroke(lineY))

    this.drawLabel(new Label("0", viewport.center))
    const width = viewport.width / this.cellCount
    const height = viewport.height / this.cellCount
    const len = 5;

    for (let i = 1; i < this.cellCount; i++) {
      const itemX = this.drawLine(viewport, new Point(-len, i * height - viewport.center.y), new Point(len, i * height - viewport.center.y))
      const itemY = this.drawLine(viewport, new Point(i * width - viewport.center.x, -len), new Point(i * width - viewport.center.x, len))
      this.penStyleResolver.resolve(this.ctx, penStyle, _ => this.ctx.stroke(itemX))
      this.penStyleResolver.resolve(this.ctx, penStyle, _ => this.ctx.stroke(itemY))
    }
  }

  drawGrid(viewport: Viewport) {
    const width = viewport.width / this.cellCount
    const height = viewport.height / this.cellCount
    const penStyle = new DefaultPenStyle(null)
    penStyle.strokeStyle = Colors.CrossBackgroundColor

    for (let i = 0; i < this.cellCount; i++) {
      for (let j = 0; j < this.cellCount; j++) {
        this.penStyleResolver.resolve(this.ctx, penStyle, _ =>
          this.ctx.strokeRect(i * width, j * height, i * width + width, j * height + height))
      }
    }
  }

  private drawLine(viewport: Viewport, p1: Point, p2: Point): Path2D {
    return new LineBuilder()
      .addPointBulk([p1, p2].map(p => Coord.toScreen(p, viewport)))
      .build()
  }

  private drawLabel(label: Label, labelStyle: FontStyle = null) {
    this.labelResolver.resolve(this.ctx, labelStyle || new DefaultFontStyle(), label)
  }
}