import Point from './Point'

export default class Label {
  text: string
  point: Point

  constructor(text: string, point: Point) {
    this.text = text
    this.point = point
  }
}