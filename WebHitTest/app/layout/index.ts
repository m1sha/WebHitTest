import Vue from "vue";
import AddPolygonFrom from "../components/AddPolygonFrom"
import PaintBox from "../components/PaintBox"
import PaintBoxToolbar from "../components/PaintBoxToolbar"
export default Vue.extend({
  template: `
<div class="text-center">
  <h1 class="display-4">Hit Test</h1>
  <div class="hittest-container">
    <div class="left">
      <paint-box-toolbar />
      <paint-box />
    </div>
    <div class="right">
      <add-polygon-from />
    </div>
  </div>
</div>
`,
  components: {
    "add-polygon-from": AddPolygonFrom,
    "paint-box": PaintBox,
    "paint-box-toolbar": PaintBoxToolbar
  }
})