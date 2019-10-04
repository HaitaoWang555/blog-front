<template>
  <div class="header">
    <v-toolbar app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <img style="width: 40px;height: 40px;" src="/v.png" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in links" :key="item.path" flat nuxt :to="item.path">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
      <v-menu left bottom offset-y >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            v-on="on"
            style="width: 64px;height: 64px;"
          >
            <v-avatar size="48px" tile>
              <img
                :src="avatar"
                alt="Vuetify"
              >
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <template 
            v-for="(item, index) in lists"
          >
            <v-list-tile :key="'list' + index" @click.stop="open(item.type)">
              <v-list-tile-title style="min-width: 120px;text-align: center;cursor: pointer;">
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="index + 1 < lists.length" :key="'divider' + index"></v-divider>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img style="width: 40px;height: 40px;" src="/v.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in links"
          :key="item.path"
          nuxt
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon style="margin-top: -2px;">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- 登录弹框 -->

   <v-dialog
      v-model="dialog"
      persistent
      max-width="450"
    >
      <Login v-if="loginForm" :close="closeDialog" :tips="showTips" />
      <Register v-if="registerForm" :close="closeDialog" :tips="showTips" />
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      top
    >
      {{ tips }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        X
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo, removeToken } from '@/utils/store'
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  name: 'Header',
  components: { Login, Register },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'loggedUser'
    ]),
    lists() {
      const list = this.isAuthenticated
        ? this.items.filter(i => i.show === 'login')
        : this.items.filter(i => i.show === 'noLogin')
      return list
    },
    avatar() {
      return this.isAuthenticated
        ? this.loggedUser.icon
        : 'https://cdn.vuetifyjs.com/images/logos/logo.svg'
    }
  },
  mounted() {
    this.init()
  },
  data() {
    return {
      title: 'Bolg',
      links: [
        { path: '/', name: '首页', icon: 'home' },
        { path: '/category', name: '分类', icon: 'category' },
        { path: '/tag', name: '标签', icon: 'label' },
        { path: '/archive', name: '归档', icon: 'archive' },
        { path: '/about', name: '关于', icon: 'question_answer' }
      ],
      items: [
        { title: '登录', type: 'login', show: 'noLogin' },
        { title: '注册', type: 'register', show: 'noLogin' },
        { title: '退出', type: 'logout', show: 'login' }
      ],
      drawer: null,
      dialog: false,
      snackbar: false,
      loginForm: false,
      registerForm: false,
      tips: '',
      color: '',
      timeout: 4000
    }
  },
  methods: {
    init() {
      const userInfo = getUserInfo()
      if (userInfo) {
        this.$store.commit('SET_USER', userInfo)
      }
    },
    open(type) {
      switch (type) {
        case 'login':
          this.loginForm = true
          this.dialog = true
          break
        case 'logout':
          this.logout()
          break
        case 'register':
          this.registerForm = true
          this.dialog = true
          break

        default:
          break
      }
    },
    showTips(color, tips) {
      this.snackbar = true
      this.tips = tips
      this.color = color
    },
    closeDialog() {
      this.dialog = false
      this.loginForm = false
      this.registerForm = false
    },
    async logout() {
      const data = await this.$axios.$post('/user/logout')
      if (!data) {
        this.showTips('success', '退出成功')
        removeToken()
        location.reload()
      } else {
        this.showTips('error', '退出失败')
      }
    }
  }
}
</script>
