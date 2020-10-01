import Vue from "vue"
import { DrawMode } from "../DrawMode"
import Point from "../Point"
export default Vue.extend({
  template: `
<div>
  <canvas ref="paintbox"></canvas>
</div>`,
  mounted() {
    const { paintbox } = this.$refs
    const canvas = paintbox as HTMLCanvasElement
    canvas.width = 640
    canvas.height = 480
    canvas.onclick = e => this.isPointInPolygone(e)

    this.$store.dispatch("initGraphic", canvas)
  },
  methods: {
    isPointInPolygone(e: MouseEvent) {
      const drawMode = this.$store.getters.drawMode
      if (drawMode !== DrawMode.SELECT_POINT_MODE) {
        return
      }

      this.$store.dispatch("isPointInPolygone", new Point(e.offsetX, e.offsetY))
    }
  }
})