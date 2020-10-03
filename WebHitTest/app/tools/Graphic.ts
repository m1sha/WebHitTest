import Point from "../tools/Point"
import Viewport from "../tools/Viewport"
import Colors from "./Colors"
import LineBuilder from './LineBuilder'
import PolygonBuilder from './PolygonBuilder'
import Shape from './Shape'
export default class Graphic {

  private ctx: CanvasRenderingContext2D
  private cellCount: number = 20
  private _viewport: Viewport

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    this.ctx.imageSmoothingEnabled = true
    this._viewport = new Viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  strokePolygon(points: Point[]) {
    const polygon = this.drawPolygon(points);
    this.ctx.strokeStyle = Colors.ForegroundColor
    this.ctx.stroke(polygon)
  }

  fillPolygon(points: Point[]) {
    const polygon = this.drawPolygon(points);
    this.ctx.fillStyle = Colors.PolygonSelectedColor
    this.ctx.fill(polygon)
  }

  drawShape(shape: Shape) {
    if (shape.polygon) {
      this.strokePolygon(shape.polygon)
    }
  }

  drawPath(points: Point[]) {
    
    var path = new PolygonBuilder()
      .addPointBulk(points, this._viewport.center)
      .build()

    this.ctx.strokeStyle = Colors.TempColor
    this.ctx.setLineDash([5, 4])
    this.ctx.stroke(path)
    this.ctx.setLineDash([])
  }

  clear(shapes: Shape[] = null) {
    this.ctx.fillStyle = Colors.BackgroundColor
    this.ctx.fillRect(0, 0, this._viewport.width, this._viewport.height)
    this.drawCrossBackground()
    this.drawCoordCross()
    if (shapes) {
      for (var i = 0; i < shapes.length; i++) {
        this.drawShape(shapes[i])
      }
    }
  }

  private drawCoordCross() {
    const viewport = this._viewport
    this.drawLine(new Point(-viewport.center.x, 0), new Point(viewport.center.x, 0), Colors.CoordCrossColor)
    this.drawLine(new Point(0, -viewport.center.y), new Point(0, viewport.center.y), Colors.CoordCrossColor)
    this.drawText("0", viewport.center)
    const width = viewport.width / this.cellCount
    const height = viewport.height / this.cellCount
    const len = 5;
    
    for (let i = 1; i < this.cellCount; i++) {
      this.drawLine(new Point(-len, i * height - viewport.center.y), new Point(len, i * height - viewport.center.y), Colors.CoordCrossColor)
      this.drawLine(new Point(i * width - viewport.center.x, -len), new Point(i * width - viewport.center.x, len), Colors.CoordCrossColor)
    }
  }

  private drawCrossBackground() {
    const width = this._viewport.width / this.cellCount
    const height = this._viewport.height / this.cellCount
    this.ctx.strokeStyle = Colors.CrossBackgroundColor

    for (let i = 0; i < this.cellCount; i++) {
      for (let j = 0; j < this.cellCount; j++) {
        this.ctx.strokeRect(i * width, j * height, i * width + width, j * height + height)
      }
    }
  }

  private drawPolygon(points: Point[]) {
    if (!points)
      throw new Error("ArgumentNullException:strokePolygon.points")
    if (points.length < 3)
      throw new Error("Through less than 3 points impossible to create polygon")
    
    return new PolygonBuilder(true)
      .addPointBulk(points, this._viewport.center)
      .build()
  }

  private drawLine(p1: Point, p2: Point, color: string) {
    const line = new LineBuilder()
      .addPointBulk([p1, p2], this._viewport.center)
      .build()
    
    this.ctx.strokeStyle = color
    this.ctx.stroke(line)
  }

  private drawText(text: string, p: Point) {
    this.ctx.fillStyle = Colors.CoordCrossColor
    this.ctx.font = "10pt Arial"
    var w = this.ctx.measureText("M").width
    this.ctx.fillText(text, p.x + 5, p.y + w + 2)
  }

  get viewport(): Viewport {
    return this._viewport
  }
}