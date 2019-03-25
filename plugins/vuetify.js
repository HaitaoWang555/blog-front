import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import colors from 'vuetify/es5/util/colors'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import LRU from 'lru-cache'

const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60 // 1 hour
})

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  minifyTheme: function(css) {
    return process.env.NODE_ENV === 'production'
      ? css.replace(/[\s|\r\n|\r|\n]/g, '')
      : css
  },
  options: {
    themeCache
  },
  iconfont: 'md',
  lang: {
    locales: { zhHans },
    current: 'zh-Hans'
  }
})
