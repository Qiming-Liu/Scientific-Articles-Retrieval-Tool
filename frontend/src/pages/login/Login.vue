<template>
  <div></div>
</template>

<script>
import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    login('admin', '888888').then(this.afterLogin);
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const {user, permissions, roles} = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes(routesConfig)
          this.$router.push('/search')
          // this.$message.success(loginRes.message, 3)
        })
      } else {
        this.error = loginRes.message
      }
    }
  }
}
</script>
