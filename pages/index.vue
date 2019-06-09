<template>
  <div>
    <Article :data="articleData"/>
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
    const data = await context.app.$axios.$get('/article/list')
    return {
      articleData: data.items,
      pageObj: {
        page: 1,
        totalPage: data.total || null
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
