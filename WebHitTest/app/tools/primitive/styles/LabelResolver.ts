import Label from '../Label';
import { FontStyle } from './FontStyle';

export default class LabelResolver {
  resolve(ctx: CanvasRenderingContext2D, fontStyle: FontStyle, label: Label) {
    ctx.save()
    ctx.fillStyle = fontStyle.fillStyle
    ctx.font = fontStyle.font
    const w = ctx.measureText("M").width
    ctx.fillText(label.text, label.point.x + 5, label.point.y + w + 2)
    ctx.restore()
  }
}