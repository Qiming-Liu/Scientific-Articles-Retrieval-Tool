<template>
  <div class="search" :style="`min-height: ${pageMinHeight}px`">
    <div>
      <img width="300" src="@/assets/img/search.png" style="margin: 0 auto;"/>
    </div>
    <a-input-search
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
        style="margin: 48px auto 0;max-width: 584px;"
    />
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'search',
  data() {
    return {}
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  methods: {
    onSearch(value) {
      this.$router.push('/Result/' + value);
    },
  },
}
</script>
<style scoped lang="less">
@import "index.less";
</style>