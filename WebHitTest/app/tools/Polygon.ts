import Point from './Point'

export default class Polygon {
  points: Point[]

  constructor(points: Point[] = null) {
    this.points = points || []
  }

  add(point: Point) {
    this.points.push(point)
  }

  remove(i: number) {
    this.points.splice(i, 1)
  }

  clone(): Polygon {
    return new Polygon([...this.points.map(p=>p.clone())])
  }
}