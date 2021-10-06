<template>
  <div class="search" :style="`min-height: ${pageMinHeight}px`">
    <div>
      <img width="300" src="@/assets/img/search.png" style="margin: 0 auto;" />
    </div>
    <a-input-search
        placeholder="input search text"
        enter-button="Search"
        size="large"
        style="margin: 48px auto 0;max-width: 584px;"
    />
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      desc: 'Please input keywords'
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
}
</script>
<style scoped lang="less">
@import "index.less";
</style>