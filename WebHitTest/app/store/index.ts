import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import Point from "../Point";
import Graphic from "../tools/Graphic";
import { DrawMode } from "../DrawMode";
import Viewport from "../Viewport";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    points: [],
    graphic: null as Graphic,
    isPointDetect: null as boolean,
    drawMode: DrawMode.SELECT_POINT_MODE,
    viewport: null as Viewport
  },

  mutations: {
    pointDetected(state: any, value: boolean) {
      state.isPointDetect = value
    }
  },

  actions: {
    initGraphic({ state, commit }, canvas: HTMLCanvasElement) {
      state.graphic = new Graphic(canvas)
      state.graphic.clear()
      state.viewport = state.graphic.viewport
    },

    createPolygon({ state, commit }, points: Point[]) {
      state.points = [...points]
      state.graphic.clear()
      state.graphic.strokePolygon(state.points)
    },

    clearPoints({ state, commit }) {
      state.points = []
    },

    isPointInPolygone({ state, commit }, point: Point) {
      axios
        .post("api/Graphic/IsPointInPolygone", {
          polygon: state.points,
          bounds: state.viewport.bounds,
          point: new Point(point.x - state.viewport.center.x, state.viewport.height - point.y - state.viewport.center.y)
        })
        .then((r: any) => {
          const result = r.data as boolean;
          commit("pointDetected", result)
          state.graphic.clear()
          if (result) {
            state.graphic.fillPolygon(state.points)
            return
          }
          state.graphic.strokePolygon(state.points)
        }).catch((e: any) => {
          commit("pointDetected", false)
          state.graphic.clear()
          state.graphic.strokePolygon(state.points)
        })
    },

    setDrawMode({ state, commit }, value: number) {
      state.drawMode = value
    },

    erase({ state, commit }) {
      state.graphic.clear()
    }
  },

  getters: {
    points: state => state.points,
    drawMode: state => state.drawMode,
    viewport: state => state.viewport,
  }
});

export default store;