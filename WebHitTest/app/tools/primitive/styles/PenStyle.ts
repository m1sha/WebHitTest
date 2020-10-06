import Colors from '../../Colors'

export class PenStyle {
  path: Path2D
  strokeStyle: string
  lineDash: number[]
  fillStyle: string

  constructor(path: Path2D) {
    this.path = path
    this.strokeStyle = null
    this.lineDash = null
    
  }
}

export class DefaultPenStyle extends PenStyle {
  constructor(path: Path2D) {
    super(path)
    this.strokeStyle = Colors.ForegroundColor
    this.fillStyle = Colors.PolygonBackgroundColor
  }
}

export class DrawPathPenStyle extends PenStyle {
  constructor(path: Path2D) {
    super(path)
    this.strokeStyle = Colors.TempColor
    this.lineDash = [5, 4]
  }
}

export class SelectFramPenStyle extends PenStyle {
  constructor(path: Path2D) {
    super(path)
    this.strokeStyle = Colors.FrameSelectColor
    this.lineDash = [4, 2]
  }
}
