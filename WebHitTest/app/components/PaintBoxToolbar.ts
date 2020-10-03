import Vue from "vue"
import { DrawMode } from "../tools/DrawMode"
export default Vue.extend({
  template: `
<div class="menu">
  <button type="button" class="btn btn-outline-secondary" :disabled="isPolygoneMode" title="Нарисовать полигон" @click="drawPolygonClick">
    <i class="fas fa-draw-polygon"></i>
  </button>
  <button type="button" class="btn btn-outline-secondary" :disabled="isSelectPointMode" title="Проверить вхождение точки в полигон" @click="selectPointClick">
    <i class="fas fa-crosshairs"></i>
  </button>
  <button type="button" class="btn btn-outline-secondary" title="Очистить полотно" @click="eraseClick">
    <i class="fas fa-eraser"></i>
  </button>
</div>
`,
  methods: {
    drawPolygonClick() {
      this.$store.dispatch("setDrawMode", DrawMode.POLYGON_MODE)
    },
    selectPointClick() {
      this.$store.dispatch("setDrawMode", DrawMode.SELECT_POINT_MODE)
    },
    eraseClick() {
      if (!confirm("Очистить полотно?")) {
        return
      }

      this.$store.dispatch("erase")
    }
  },
  computed: {
    isPolygoneMode() {
      return this.$store.getters.drawMode === DrawMode.POLYGON_MODE
    },
    isSelectPointMode() {
      return this.$store.getters.drawMode === DrawMode.SELECT_POINT_MODE
    }
  }


})