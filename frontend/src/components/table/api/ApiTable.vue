<template>
  <a-table :data-source="apiSource" :pagination="false">
  </a-table>
</template>

<script>
  export default {
    name: 'ApiTable',
    props: {
      title: {
        type: String,
        default: 'API'
      },
      type: {
        type: String,
        default: 'api',
        validator(value) {
          return ['api', 'event'].includes(value)
        }
      },
      apiSource: Array
    },
    computed: {
      isApi() {
        return this.type === 'api'
      }
    }
  }
</script>

<style scoped>

</style>