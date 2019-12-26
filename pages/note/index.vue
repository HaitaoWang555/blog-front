<template>
  <div>
   <v-navigation-drawer
      :class="isMobile ? '' : 'note-aside'"
      fixed
      clipped
      v-model="drawer">
      <v-treeview
        :items="items"
        :active.sync="active"
        :open.sync="open"
        active-class="primary--text"
        item-children="articles"
        item-key="key"
        open-on-click
        activatable
        hoverable></v-treeview>
    </v-navigation-drawer>
    <v-toolbar
      dense
      fixed
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">笔记</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content class="mb-2 note-content" :class="drawer ? 'note-content-left' : ''">
      <v-container>
        <v-fade-transition mode="out-in">
          <v-layout row align-start justify-center>
            <v-flex xs12 sm8 md8>
              <div class="display-1 font-weight-medium">
                {{articleData.title}}
              </div>
              <v-layout wrap align-start justify-start class="pa-2">
                <span class="px-2">
                  <v-icon>date_range</v-icon>
                  {{ articleData.updatedAt | time('{y}-{m}-{d}') }}
                </span>
                <span class="px-2">
                  <v-icon>visibility</v-icon>
                  {{ articleData.hits || 0 }}
                </span>
              </v-layout>
              <div class="markdown-body" v-html="markdownContent" v-highlight >
              </div>
            </v-flex>
          </v-layout>
        </v-fade-transition>
      </v-container>
    </v-content>
    <ScrollTop></ScrollTop>
    <Footer :class="drawer ? 'note-content-left' : ''"></Footer>
  </div>
</template>

<script>
import Footer from '~/components/notes/Footer.vue'
import ScrollTop from '~/components/ScrollTop.vue'
import 'github-markdown-css/github-markdown.css'
import { lazyload, remEvent } from '@/utils/lazyload'

export default {
  name: 'Notes',
  layout: 'note',
  components: {
    Footer, ScrollTop
  },
  head() {
    return { title: `笔记` }
  },
  async asyncData(context) {
    let SidebarList = await context.app.$axios.$get('/category/list')
    const index = SidebarList.findIndex(i => i.articles.length > 0)
    const open = []
    const active = []
    SidebarList[index].open = true
    SidebarList = SidebarList.map((i) => {
      const obj = i
      obj.key = 'p' + obj.id
      if (obj.open) open.push(obj.key)
      obj.articles = obj.articles.map((item, index) => {
        item.name = item.title
        item.key = 'c' + item.id
        if (obj.open && index === 0) {
          active.push(item.key)
        }
        return item
      })
      return obj
    })
    const articleId = Number(active[0].slice(1))
    const params = { id: articleId }
    const articleData = await context.app.$axios.$get('/article/getOne', { params })
    let content = articleData.content
    content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
      return match.replace('src', 'data-src')
    })
    return {
      articleData,
      markdownContent: content,
      items: SidebarList,
      open,
      active,
      activeId: active[0]
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.clientWidth < 500
    }
  },
  data() {
    return {
      drawer: true,
      markdownContent: null,
      articleData: null,
      items: [],
      open: [],
      active: [],
      activeId: null
    }
  },
  mounted() {
    this.initArticle()
  },
  destroyed() {
    remEvent()
  },
  watch: {
    active: {
      deep: true,
      handler(val) {
        if (val) {
          this.clickItem()
        }
      }
    }
  },
  methods: {
    clickItem() {
      const id = this.active[0] || null
      if (!id && this.activeId) {
        this.activeId = null
        return
      }
      if (id !== this.activeId) {
        this.activeId = id
        const articleId = Number(this.activeId.slice(1))
        this.initArticleData(articleId)
      }
    },
    async initArticleData(articleId) {
      const articleData = await this.$axios.$get('/article/getOne', { params: { id: articleId } })
      let content = articleData.content
      content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
        return match.replace('src', 'data-src')
      })
      this.articleData = articleData
      this.markdownContent = content
      this.initArticle()
    },
    initArticle() {
      this.$nextTick(() => {
        const els = document.querySelectorAll('.markdown-body img')
        if (els && els.length > 0) {
          lazyload(els)
        }
        if (this.isMobile) this.drawer = false
        this.$vuetify.goTo('html')
      })
    }
  }
}
</script>
