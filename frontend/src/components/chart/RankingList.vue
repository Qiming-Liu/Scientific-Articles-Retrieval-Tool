<template>
  <div class="rank">
    <!--    <h4 class="title">{{ title }}</h4>-->
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span class="text"><a v-on:click="onclick(index)">{{ item.name }}</a></span>
        <span>{{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankingList',
  props: ['title', 'list', 'onclick']
}
</script>
<style lang="less" scoped>
.rank {
  .text {
    max-width: 85%;

    @media screen and (max-width: 565px) {
      max-width: 75%;
    }

    @media screen and (max-width: 379px) {
      max-width: 65%;
    }

    @media screen and (max-width: 300px) {
      max-width: 55%;
    }

    @media screen and (max-width: 255px) {
      max-width: 20%;
    }
  }

  .list {
    padding: 0;
    list-style: none;

    li {
      margin-top: 16px;

      span {
        color: @text-color-second;
        font-size: 14px;
        line-height: 22px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      span:first-child {
        background-color: @layout-bg-color;
        border-radius: 20px;
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        margin-right: 24px;
        height: 20px;
        line-height: 20px;
        width: 20px;
        text-align: center;
      }

      span.active {
        background-color: #314659 !important;
        color: @text-color-inverse !important;
      }

      span:last-child {
        float: right;
      }
    }
  }
}
</style>
