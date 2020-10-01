import Point from "../Point"
import Viewport from "../Viewport"
import Colors from "./Colors"
export default class Graphic {

  private ctx: CanvasRenderingContext2D
  private cellCount: number = 20
  private _viewport: Viewport

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    this._viewport = new Viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  strokePolygon(points: Point[]) {
    this.drawPolygon(points);
    this.ctx.stroke()
  }

  fillPolygon(points: Point[]) {
    this.drawPolygon(points);
    this.ctx.fillStyle = Colors.PolygonSelectedColor
    this.ctx.fill()
  }

  clear() {
    this.ctx.fillStyle = Colors.BackgroundColor
    this.ctx.fillRect(0, 0, this._viewport.width, this._viewport.height)
    this.drawCrossBackground()
    this.drawCoordCross()
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

    const startPoint = points[0];
    const ctx = this.ctx;
    const viewport = this._viewport

    ctx.beginPath()
    ctx.moveTo(viewport.center.x + startPoint.x, viewport.center.y - startPoint.y)
    ctx.strokeStyle = Colors.ForegroundColor

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(viewport.center.x + points[i].x, viewport.center.y - points[i].y)
    }

    ctx.closePath()
    
  }

  private drawLine(p1: Point, p2: Point, color: string) {
    const ctx = this.ctx;
    const viewport = this._viewport
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(viewport.center.x + p1.x, viewport.center.y - p1.y)
    ctx.lineTo(viewport.center.x + p2.x, viewport.center.y - p2.y)
    ctx.closePath()
    ctx.stroke()
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