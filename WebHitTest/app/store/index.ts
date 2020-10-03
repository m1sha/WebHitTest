import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import Point from "../tools/Point";
import Graphic from "../tools/Graphic";
import { CommandDispetcher } from '../tools/CommandDispetcher';
import { DrawMode } from "../tools/DrawMode";
import Viewport from "../tools/Viewport";
import Shape from '../tools/Shape';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    shapes: [],
    tempShape: null as Shape,
    graphic: null as Graphic,
    commandDispetcher: null as CommandDispetcher,
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
      state.commandDispetcher = new CommandDispetcher()
    },

    createPolygon({ state, commit }, points: Point[]) {
      state.shapes.push(new Shape(points))
      state.graphic.clear(state.shapes)
    },

    drawPath({ state, commit }, points: Point[]) {
      state.tempShape = new Shape(points)
      state.graphic.clear(state.shapes)
      state.graphic.drawPath(points)
    },

    restore({ state, commit }) {
      state.tempShape = null
      state.graphic.clear(state.shapes)
    },

    clearShapes({ state, commit }) {
      state.shapes = []
    },

    async isPointInPolygone({ state, commit }, point: Point) {
      state.graphic.clear(state.shapes)
      for (var i = state.shapes.length - 1; i >= 0 ; i--) {
        const shape = state.shapes[i] as Shape
        try {
          const r = await axios
            .post("api/Graphic/IsPointInPolygone", {
              polygon: shape.polygon,
              bounds: state.viewport.bounds,
              point: new Point(point.x - state.viewport.center.x, state.viewport.height - point.y - state.viewport.center.y)
            })
          const result = r.data as boolean;
          commit("pointDetected", result)
          if (result) {
            state.graphic.fillPolygon(shape.polygon)
            break
          }
          state.graphic.strokePolygon(shape.polygon)
        } catch (e) {
          commit("pointDetected", false)
          state.graphic.strokePolygon(shape.polygon)
        }
      }
    },

    setDrawMode({ state, commit }, value: number) {
      state.drawMode = value
    },

    erase({ state, commit }) {
      state.shapes = []
      state.graphic.clear()
    }
  },

  getters: {
    drawMode: state => state.drawMode,
    viewport: state => state.viewport,
    commandDispetcher: state => state.commandDispetcher
  }
});

export default store;