<template>
  <div>
    <Article :data="articleData.list"/>
    <w-pagination :pageObj="pageObj" :changePage="changePage" />
  </div>
</template>

<script>
import Article from '@/components/Article'
import WPagination from '~/components/w-pagination.vue'

export default {
  name: 'Index',
  head() {
    return { title: `首页` }
  },
  async asyncData(context) {
    const articleData = await context.app.$axios.$get('/article/list')
    return {
      articleData,
      pageObj: {
        page: articleData.pageNum || 1,
        totalPage: articleData.pages || null
      }
    }
  },
  components: {
    Article,
    WPagination
  },
  data() {
    return {
      articleData: null
    }
  },
  methods: {
    async changePage() {
      const params = {
        page: this.pageObj.page
      }
      this.articleData = await this.$axios.$get('/article/list', { params })
    }
  }
}
</script>
