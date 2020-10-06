import Colors from '../../Colors'

export class BrushStyle {
  fillStyle: string
  path: Path2D

  constructor(path: Path2D) {
    this.path = path
    this.fillStyle = null
  }
}

export class DefaultBrushStyle extends BrushStyle {
  constructor(path: Path2D) {
    super(path)
    this.fillStyle = Colors.PolygonBackgroundColor
  }
}

export class BackgroundBrushStyle extends BrushStyle {
  constructor(path: Path2D) {
    super(path)
    this.fillStyle = Colors.BackgroundColor
  }
}