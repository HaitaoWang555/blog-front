import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

// noinspection JSAnnotator
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Blog',
    titleTemplate: '%s - blog',
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
    { src: '~/assets/style/app.styl' }
  ],
  modules: [],
  plugins: [
    { src: '@/plugins/vuetify' }
  ],
  router: {},
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
