<template>
  <div class="result" :style="`min-height: ${pageMinHeight}px`">
    <a-row style="margin: 0 -12px">
      <a-col style="padding: 0 12px" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card id="header" :title="'Keyword: [' + this.$route.query.name + ']'">
          <a-form layout="inline">
            <a-form-item label="Bloom">
              <a-radio-group v-model="bloom" @change="bloomOnChange">
                <a-radio-button value="1">
                  On
                </a-radio-button>
                <a-radio-button value="0">
                  Off
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card id="graph-card" style="margin-top: 24px" title="Graph">
          <div ref="graph" id="graph" style="max-height: 500px"></div>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card style="margin-top: 24px" title="List">
          <div class="result-list">
            <a-table
                :dataSource="searchData"
                :columns="tableColumns"
                :pagination="{style: { marginBottom: 0 }, pageSize: 11}"
                size="small"
                rowKey="index"
            >
            </a-table>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import ForceGraph3D from "3d-force-graph";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import merge from 'webpack-merge';

export default {
  name: "result",
  data() {
    return {
      searchData: [],
      columns: [
        {
          dataIndex: 'index',
          key: 'Index'
        },
        {
          dataIndex: 'subject',
          key: 'Subject',
        },
        {
          dataIndex: 'relation',
          key: 'Relation',
        },
        {
          dataIndex: 'object',
          key: 'Object',
        }
      ],
      graph: null,
      name: this.$route.params.query,
      bloom: '1'
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initGraph().then(() => {
        this.graph.width(this.$refs.graph.clientWidth);
        this.graph.height(this.$refs.graph.clientHeight);
      });
    });
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    tableColumns() {
      let columns = this.columns
      return columns.map(item => {
        item.title = this.$t(item.key);
        return item;
      })
    }
  },
  methods: {
    bloomOnChange(e) {
      this.bloom = e.target.value;
      this.$router.push({
        query: merge(this.$route.query, {'bloom': this.bloom})
      })
    },
    async initGraph() {
      let limit = this.$route.query.limit;
      let bloom = this.$route.query.bloom;
      let name = this.$route.query.name;
      if (limit === undefined) {
        limit = '1000';
      }
      if (bloom === undefined || bloom === '1') {
        bloom = '1';
        this.bloom = bloom;
      } else {
        bloom = '0';
        this.bloom = bloom;
      }
      if (name === undefined) {
        name = 'covid';
      }
      this.graph = ForceGraph3D({
        controlType: "trackball",
        rendererConfig: {antialias: true, alpha: true}
      })(this.$refs.graph)
          .jsonUrl(process.env.VUE_APP_BACKEND_URL + '/search?limit=' + limit + '&name=' + name)
          .backgroundColor("black")
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

      let setList = setInterval(() => {
        let links = this.graph.graphData().links;
        if (links.length > 0) {
          clearInterval(setList);
        }
        for (let i = 0; i < links.length; i++) {
          this.searchData.push({
            index: i + 1,
            subject: links[i].source.name,
            relation: links[i].type,
            object: links[i].target.name,
          });
        }
      }, 1000);
    },
  }
};
</script>
<style>
#graph-card .ant-card-body {
  padding: 0 !important;
}

#header {
  border: 0;
}
</style>