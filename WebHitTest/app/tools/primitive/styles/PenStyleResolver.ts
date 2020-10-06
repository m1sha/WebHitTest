import { PenStyle } from './PenStyle';

export default class PenStyleResolver {
  resolve(ctx: CanvasRenderingContext2D, penStyle: PenStyle, render: Function = null) {
    ctx.save()

    if (penStyle.strokeStyle)
      ctx.strokeStyle = penStyle.strokeStyle
    if (penStyle.lineDash)
      ctx.setLineDash(penStyle.lineDash)

    if (render)
      render(penStyle)
    else
      ctx.stroke(penStyle.path)

    ctx.restore();
  }
}