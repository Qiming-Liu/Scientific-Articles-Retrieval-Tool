<template>
  <div class="overview" :style="`min-height: ${pageMinHeight}px`">
    <div ref="graph" id="graph" style="max-height: 75vh"></div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import ForceGraph3D from "3d-force-graph";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default {
  name: "overview",
  data() {
    return {
      graph: null,
    };
  },
  mounted() {
    this.initGraph()
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  methods: {
    async initGraph() {
      let limit = this.$route.query.limit;
      let bloom = this.$route.query.bloom;
      if (limit === undefined) {
        limit = "1000";
      }
      if (bloom === undefined) {
        bloom = "1";
      }

      this.graph = ForceGraph3D({
        controlType: "trackball",
        rendererConfig: {antialias: true, alpha: true}
      })(this.$refs.graph)
          .jsonUrl(process.env.VUE_APP_BACKEND_URL + '/overview?limit=' + limit)
          .backgroundColor("black")
          .width(this.$refs.graph.parentElement.offsetWidth)
          .height(this.$refs.graph.parentElement.offsetHeight + 150)
          .showNavInfo(false)

          .nodeAutoColorBy('id')
          .onNodeHover(node => this.$refs.graph.style.cursor = node ? 'pointer' : null)
          .onNodeClick(node => {//camera
            // Aim at node from outside it
            let distance = 200;
            let distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            this.graph.cameraPosition(
                {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                node, // lookAt ({ x, y, z })
                3000  // ms transition duration)
            )
          })
          .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          })

          .linkLabel(r => r.type)
          .linkWidth(1)
          .linkAutoColorBy(r => r.type)
          .linkDirectionalArrowLength(5)
          .linkDirectionalArrowRelPos(1)
          .linkOpacity(0.9)

      //bloom
      if (bloom === "1") {
        let bloomPass = new UnrealBloomPass();
        bloomPass.strength = 3;
        bloomPass.radius = 1;
        bloomPass.threshold = 0.1;
        this.graph.postProcessingComposer().addPass(bloomPass);
      }
    }
  }
};
</script>