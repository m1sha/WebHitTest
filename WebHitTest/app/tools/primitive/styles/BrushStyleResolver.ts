import { BrushStyle } from './BrushStyle'

export default class BrushStyleResolver {
  resolve(ctx: CanvasRenderingContext2D, brushStyle: BrushStyle, render: Function = null) {
    ctx.save()

    if (brushStyle.fillStyle)
      ctx.fillStyle = brushStyle.fillStyle

    if (render)
      render(brushStyle)
    else
      ctx.fill(brushStyle.path)

    ctx.restore();
  }
}