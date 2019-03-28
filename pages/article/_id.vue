<template>
    <Article :data="[articleData]" :model="model"/>
</template>

<script>
import Article from '@/components/Article'

export default {
  name: 'ArticleId',
  head() {
    return { title: `${this.articleData.title}` }
  },
  async asyncData(context) {
    const params = context.params
    const articleData = await context.app.$axios.$get('/article/getOne', { params })
    return {
      articleData
    }
  },
  components: {
    Article
  },
  data() {
    return {
      articleData: null,
      model: {
        type: 'details'
      }
    }
  }
}
</script>
