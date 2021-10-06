<template>
  <div class="analysis">
<!--    <div style="margin-top: 16px">-->
<!--      <b>Searching in progress:</b>-->
<!--      <a-progress-->
<!--          :stroke-color="{-->
<!--        from: '#108ee9',-->
<!--        to: '#87d068',-->
<!--      }"-->
<!--          :percent="per"-->
<!--          status="active"-->
<!--          onSearch="onSearch"-->
<!--      />-->
<!--    </div>-->
    <a-row style="margin: 0 -12px">
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" style="margin-top: 24px" title="句子的排名">
          <ranking-list title="Answer Sentence ranking" :list="rankList"/>
        </a-card>
      </a-col>
<!--      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">-->
<!--        <a-card :loading="loading" :bordered="false" style="margin-top: 24px" title="搜索次数, 相关关键词">-->
<!--          <hot-search/>-->
<!--        </a-card>-->
<!--      </a-col>-->
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" style="margin-top: 24px;" title="Category">
          <sales-data/>
          <a-radio-group slot="extra" style="margin: -12px 0">
            <a-radio-button value="a">All</a-radio-button>
            <a-radio-button value="b">One</a-radio-button>
            <a-radio-button value="c">Two</a-radio-button>
          </a-radio-group>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import RankingList from '../../components/chart/RankingList'
// import HotSearch from './HotSearch'
import SalesData from './SalesData'

const rankList = []

for (let i = 0; i < 8; i++) {
  rankList.push({
    name: 'Answer sentence ' + i,
    total: 0.89 - i * 0.1
  })
}

export default {
  name: 'Analysis',
  i18n: require('./i18n'),
  data() {
    return {
      rankList,
      loading: true,
      per: 0
    }
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000);
    setInterval(() => {
      this.per += Math.random() * 50;
      if (this.per >= 100) {
        this.per = 0;
      }
    }, 1000)
  },
  components: {SalesData, RankingList}
}
</script>

<style lang="less" scoped>
.extra-wrap {
  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a:not(:first-child) {
      margin-left: 24px;
    }
  }
}

@media screen and (max-width: 992px) {
  .extra-wrap .extra-item {
    display: none;
  }
}

@media screen and (max-width: 576px) {
  .extra-wrap {
    display: none;
  }
}

</style>
