<template>
  <div>
    <Article
      v-if="articleData && articleData.length > 0"
      :data="articleData"
    />
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
        pagesize: 15,
        total: data.total || null
      }
    }
  },
  components: {
    Article,
    WPagination
  },
  data() {
    return {
      articleData: null,
      pageObj: null
    }
  },
  methods: {
    async changePage(val) {
      const page = this.pageObj.page
      const params = {
        page
      }
      const data = await this.$axios.$get('/article/list', { params })
      this.articleData = data.items
      this.pageObj.total = data.total
    }
  }
}
</script>
