<template>
    <Article :data="articleData.list"/>
</template>

<script>
import Article from '@/components/Article'

export default {
  name: 'Index',
  head() {
    return { title: `首页` }
  },
  async asyncData(context) {
    const articleData = await context.app.$axios.$get('/article/list')
    return {
      articleData
    }
  },
  components: {
    Article
  },
  data() {
    return {
      articleData: null
    }
  }
}
</script>
