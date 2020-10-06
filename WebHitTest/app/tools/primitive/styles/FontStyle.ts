import Colors from '../../Colors'

export class FontStyle {
  font: string
  fillStyle: string
  constructor() {
    this.font = null
    this.fillStyle = null
  }
}

export class DefaultFontStyle extends FontStyle  {
  constructor() {
    super()
    this.font = "10pt Arial"
    this.fillStyle = Colors.CoordCrossColor
  }
}