import Vue from "vue";
import Point from "../Point";
export default Vue.extend({
  template: `
<form class="needs-validation" novalidate>
  <div class="form-row" v-for="(point, i) in points">
    <div class="col-md-5 mb-5">
      <label :for="'validationCustom'+i+'1'">X{{i}}</label>
      <input type="number" class="form-control" :id="'validationCustom'+i+'1'" placeholder="X" value="0" v-model.number="point.x" required :min="-xValue" :max="xValue" @keyup="xKeyup($event, i)">
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-5 mb-5">
      <label :for="'validationCustom'+i+'2'">Y{{i}}</label>
      <input type="number" class="form-control" :id="'validationCustom'+i+'2'" placeholder="Y" value="0" v-model.number="point.y" required :min="-yValue" :max="yValue" @keyup="yKeyup($event, i)">
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div v-show="points.length > 3" class="col-md-2 mb-2" style="padding-top: 2rem">
      <button class="btn btn-danger" type="button" @click="remove(i)"><i class="fas fa-ban"></i></button>
    </div>
  </div>
  <button class="btn btn-success" type="button" @click="addRow"><i class="fas fa-plus"></i></button>
  <button class="btn btn-primary" type="submit" @click.prevent.stop="createPolygon">Создать полигон</button>
  <button class="btn btn-danger" type="button" @click="cancel">Отмена</button>
</form>
`,

  data() {
    return {
      points: []
    }
  },

  created() {
    this.clear()
  },

  methods: {
    createPolygon() {
      this.$store.dispatch("createPolygon", this.points)
    },

    addRow() {
      this.points.push(new Point(0, 0))
    },

    remove(i: number) {
      if (this.points.length <= 3) {
        return
      }

      if (!confirm("Удалить точку?")) {
        return
      }

      this.points.splice(i, 1)
    },

    cancel() {
      if (!confirm("Отменить изменения?")) {
        return
      }

      this.clear()
    },

    clear() {
      this.points = [
        new Point(0, 0),
        new Point(0, 0),
        new Point(0, 0)
      ]
    },

    xKeyup(e: any, i: number) {
      const input = e.target as HTMLInputElement
      const viewport = this.$store.getters.viewport
      const value = parseFloat(input.value)
      this.points[i].x = !value || isNaN(value)? 0: this.getValidValue(value, viewport.center.x, -viewport.center.x)
    },

    yKeyup(e: any, i: number) {
      const input = e.target as HTMLInputElement
      const viewport = this.$store.getters.viewport
      const value = parseFloat(input.value)
      this.points[i].y = !value || isNaN(value) ? 0 : this.getValidValue(value, viewport.center.y, -viewport.center.y)
    },

    getValidValue(value: number, max: number, min: number): number {
      if (value > max) {
        return max
      }

      if (value < min) {
        return min
      }

      return value
    }
  },
  computed: {
    xValue() {
      const v = this.$store.getters.viewport
      return v ? v.center.x: 0
    },
    yValue() {
      const v = this.$store.getters.viewport
      return v ? v.center.y: 0
    }
  }
})
