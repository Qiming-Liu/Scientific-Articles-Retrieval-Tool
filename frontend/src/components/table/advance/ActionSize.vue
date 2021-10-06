<template>
  <div class="action-size" ref="root">
    <a-tooltip title="action-size">
      <a-dropdown placement="bottomCenter" :trigger="['click']" :get-popup-container="() => $refs.root">
        <a-icon class="action" type="column-height" />
        <a-menu :selected-keys="[value]" slot="overlay" @click="onClick">
          <a-menu-item key="default">
            default
          </a-menu-item>
          <a-menu-item key="middle">
            middle
          </a-menu-item>
          <a-menu-item key="small">
            small
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'ActionSize',
    props: ['value'],
    inject: ['table'],
    data() {
      return {
        selectedKeys: ['middle']
      }
    },
    methods: {
      onClick({key}) {
        this.$emit('input', key)
      }
    }
  }
</script>

<style scoped lang="less">
.action-size{
  display: inline-block;
}
</style>