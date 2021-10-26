<template>
  <div class="search" :style="`min-height: ${pageMinHeight}px`">
    <div>
      <img width="300" src="@/assets/img/search.png" style="margin: 0 auto;"/>
    </div>
    <a-input-search
        placeholder="Input search text or question"
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
    startsWithAny(prefixes, string) {
      for (let prefix of prefixes) {
        if (string.startsWith(prefix))
          return true;
      }
      return false;
    },
    endsWithAny(suffixes, string) {
      for (let suffix of suffixes) {
        if (string.endsWith(suffix))
          return true;
      }
      return false;
    },
    onSearch(value) {
      if (value === "") {
        return;
      }
      value = value.toLowerCase();
      //判断是否为句子
      // 1. 单词数大于3 or 2.以.!?结尾 or 3.以疑问词开头
      let prefixes = ['which', 'what', 'whose', 'who', 'whom', 'where', 'whither', 'whence', 'when', 'how', 'why', 'whether'];
      let suffixes = ['.', '!', '?'];
      if (value.split(' ').length > 3 || this.startsWithAny(prefixes, value) || this.endsWithAny(suffixes, value)) {
        this.$router.push('/Sentence/Result?text=' + encodeURI(value));
      } else {
        this.$router.push('/Word/Result?bloom=1&name=' + encodeURI(value));
      }
    },
  },
}
</script>
<style scoped lang="less">
@import "index.less";
</style>