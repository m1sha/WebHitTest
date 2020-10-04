import Vue from "vue"
import { CommandDispetcher, Events } from '../tools/CommandDispetcher'
import Point from "../tools/primitive/Point"
import PolygonBuilder from '../tools/builders/PolygonBuilder'
import Viewport from '../tools/primitive/Viewport'
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
    this.$store.dispatch("initGraphic", canvas)
    const dispetcher = this.$store.getters.commandDispetcher as CommandDispetcher

    canvas.oncontextmenu = e => e.preventDefault()
    canvas.onmousedown = e => dispetcher.switchCommad(Events.MOUSE_DOWN, this.drawMode, e)
    canvas.onmouseup = e => dispetcher.switchCommad(Events.MOUSE_UP, this.drawMode, e)
    canvas.onmousemove = e => dispetcher.switchCommad(Events.MOUSE_MOVE, this.drawMode, e)
    
    dispetcher.getCommandByName("isPointInPolygone").action = this.isPointInPolygone
    dispetcher.getCommandByName("addPolygonPointOrFinish").action = this.addPolygonPointOrFinish
    dispetcher.getCommandByName("cancelDrawPolygon").action = this.cancelDrawPolygon
    dispetcher.getCommandByName("startDrawPolygon").action = this.startDrawPolygon
    dispetcher.getCommandByName("drawingPolygon").action = this.drawingPolygon
  },
  data() {
    return {
      polygonBuilder: null,
      isDrawing: false
    }
  },
  methods: {
    isPointInPolygone(e: MouseEvent) {
      this.$store.dispatch("isPointInPolygone", new Point(e.offsetX, e.offsetY))
    },

    startDrawPolygon(e: MouseEvent) {
      if (this.isDrawing) {
        return
      }

      const viewport = this.viewport
      this.polygonBuilder = new PolygonBuilder()
      this.polygonBuilder.addPoint(new Point(e.offsetX - viewport.center.x, viewport.height -  e.offsetY - viewport.center.y))
      this.isDrawing = true
    },

    drawingPolygon(e: MouseEvent) {
      if (!this.isDrawing) {
        return
      }

      const count = this.polygonBuilder.points.length
      if (count > 1) {
        this.polygonBuilder.remove(count - 1)
      }

      const viewport = this.viewport
      this.polygonBuilder.addPoint(new Point(e.offsetX - viewport.center.x, viewport.height - e.offsetY - viewport.center.y))
      this.$store.dispatch("drawPath", this.polygonBuilder.toPoints())
    },

    addPolygonPointOrFinish(e: MouseEvent) {
      if (!this.isDrawing) {
        return
      }

      const viewport = this.viewport
      const point = new Point(e.offsetX - viewport.center.x, viewport.height - e.offsetY - viewport.center.y)
      const count = this.polygonBuilder.points.length
      const points = this.polygonBuilder.points.filter(p => (point.x >= p.x - 5 && point.x <= p.x + 5) && (point.y >= p.y - 5 && point.y <= p.y + 5))
      const resultPoint = (count > 1 && points.length > 1 && confirm("Замкунить многоугольник?")) ? points[0] : point
      this.polygonBuilder.addPoint(resultPoint)

      if (this.polygonBuilder.isClosed) {
        this.polygonBuilder.remove(count - 1)
        this.$store.dispatch("createPolygon", this.polygonBuilder.toPoints())
        this.isDrawing = false
        this.polygonBuilder = null
      }
    },

    cancelDrawPolygon(e: MouseEvent) {
      if (!this.polygonBuilder) {
        return
      }

      this.$store.dispatch("restore")
      this.isDrawing = false
      this.polygonBuilder = null
    }
  },
  computed: {
    drawMode(): number {
      return this.$store.getters.drawMode
    },

    viewport(): Viewport {
      return this.$store.getters.viewport
    }
  }

})

