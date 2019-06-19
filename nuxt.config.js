import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import serveConfig from './config/server-config'

// noinspection JSAnnotator
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: serveConfig.blogName,
    titleTemplate: `%s - ${serveConfig.blogName}`,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'A nuxt blog' },
      { hid: 'keywords', name: 'keywords', content: 'vue, nuxt' },
      { name: 'author', content: 'wanghaitao0522@gmail.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/style/style.css' },
    { src: '~/assets/style/app.styl' },
    'highlight.js/styles/github.css'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true,
    credentials: true
  },
  proxy: {
    '/api': {
      target: serveConfig.devProxyURL,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  plugins: [
    { src: '@/plugins/vuetify' },
    { src: '@/plugins/global' },
    { src: '@/plugins/axios' }
  ],
  router: {
    // nuxt 的bug,scrollToTop不生效，要重写scrollBehavior方法
    scrollBehavior: function(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#1976d2' },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
