<template>
  <div>
    <Article :data="[articleData]" :model="model"/>
    <comment :article-id="articleData.id" />
  </div>
</template>

<script>
import Article from '@/components/Article'
import Comment from '@/components/Comment'

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
    Article, Comment
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
