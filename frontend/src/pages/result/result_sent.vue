<template>
  <div class="result" :style="`min-height: ${pageMinHeight}px`">
    <a-row style="margin: 0 -12px">
      <a-col style="padding: 0 12px" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card id="header" :title="'Question: [' + this.$route.query.text + ']'">

        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="15" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" style="margin-top: 24px" title="Answer">
          <ranking-list :list="rankList" :onclick="onclick"/>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" style="margin-top: 24px" :title="'Top ' + this.top">
          <p class="full-text" v-html="text"></p>
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
      text: '',
      top: '1'
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
    onclick(index) {
      this.text = this.highlight(this.rankList[index].name);
      this.top = index + 1;
    },
    highlight(text) {
      let keywords = this.$route.query.text.split(' ');
      let str = text.split(' ');
      if (keywords && keywords.length > 0) {
        for (let i = 0; i < str.length; i++) {
          for (let j = 0; j < keywords.length; j++) {
            if (str[i].toLowerCase().indexOf(keywords[j]) !== -1 && str[i].length - keywords[j].length < 3) {
              str[i] = '<span class="highlight"><b>' + str[i] + '</b></span>';
            }
          }
        }
      }
      return str.join(' ');
    },
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
                name: value,
                total: answer[i].score
              })
            }
            this.loading = false;
            this.text = this.highlight(this.rankList[0].name);
          })
          .catch((error) => {
            // handle error
            console.log(error);
          })
          .then(() => {
            //always
          });
    }
  }
}
</script>
<style>
.full-text {
  line-height: 24px;
  color: black;
}

.highlight {
  color: red !important;
}

#header {
  border: 0;
}
</style>