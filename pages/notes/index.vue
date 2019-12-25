<template>
  <div class="article">
    <div class="markdown-body" v-html="markdownContent" v-highlight >
    </div>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import { lazyload, remEvent } from '@/utils/lazyload'
import { mapGetters } from 'vuex'

export default {
  name: 'Notes',
  layout: 'notes',
  head() {
    return { title: `笔记` }
  },
  data() {
    return {
      categoryData: null,
      markdownContent: null
    }
  },
  computed: {
    ...mapGetters([
      'SidebarId'
    ])
  },
  watch: {
    SidebarId: {
      deep: true,
      handler(val) {
        if (val) {
          this.init()
        }
      }
    }
  },
  destroyed() {
    remEvent()
  },
  methods: {
    async init() {
      const params = { id: this.SidebarId }
      this.initArticle(params)
    },
    async initArticle(params) {
      let { content } = await this.$axios.$get('/article/getOne', { params })
      content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
        return match.replace('src', 'data-src')
      })
      this.markdownContent = content
      this.$nextTick(() => {
        const els = document.querySelectorAll('.markdown-body img')
        if (els && els.length > 0) {
          lazyload(els)
        }
      })
    }
  }
}
</script>
