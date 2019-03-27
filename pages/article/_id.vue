<template>
  <v-layout column align-center justify-start>
    <v-flex xs12 sm8 md6>
      <Article :data="[articleData]" :model="model"/>
    </v-flex>
  </v-layout>
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
