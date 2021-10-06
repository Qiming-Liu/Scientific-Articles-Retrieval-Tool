<template>
  <div class="common-layout">
    <div class="content"><slot></slot></div>
    <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer>
  </div>
</template>

<script>
import PageFooter from '@/layouts/footer/PageFooter'
import {mapState} from 'vuex'

export default {
  name: 'CommonLayout',
  components: {PageFooter},
  computed: {
    ...mapState('setting', ['footerLinks', 'copyright'])
  }
}
</script>
