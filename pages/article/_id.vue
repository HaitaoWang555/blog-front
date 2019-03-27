<template>
    <Article :data="[articleData]" :model="model"/>
</template>

<script>
import Article from '@/components/Article'
import { getOneById } from '@/api/article'

export default {
  name: 'ArticleId',
  head() {
    return { title: `${this.articleData.title}` }
  },
  async asyncData(context) {
    const { id } = context.params
    const { data: articleData } = await getOneById(id)
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
