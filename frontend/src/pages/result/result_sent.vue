<template>
  <div class="result" :style="`min-height: ${pageMinHeight}px`">
    <a-row style="margin: 0 -12px">
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" style="margin-top: 24px" title="Answer">
          <ranking-list title="Rank" :list="rankList"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import RankingList from '../../components/chart/RankingList'
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: 'result',
  data() {
    return {
      rankList: [],
      loading: true,
    }
  },
  created() {
    this.$nextTick(() => {
      this.query();
    });
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  components: {RankingList},
  methods: {
    query() {
      let text = this.$route.query.text;
      let k = this.$route.query.k;
      if (text === undefined) {
        window.location.replace('/search');
        this.$closePage('/result_sent', '/search');
        return;
      }
      if (k === undefined) {
        k = "8";
      }
      axios.get(process.env.VUE_APP_BACKEND_URL + '/question?text=' + text + '&k=' + k)
          .then((response) => {
            let answer = response.data;
            for (let i = 0; i < answer.length; i++) {
              let value = answer[i].data
              value = value.slice(0, 1).toUpperCase() + value.slice(1)
              this.rankList.push({
                name: value ? (value.length > 90 ? (value.substring(0, 90)) + "..." : value) : "",
                total: answer[i].score
              })
            }
            this.loading = false;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          })
          .then(() => {
            console.log('started')
          });
    }
  }
}
</script>