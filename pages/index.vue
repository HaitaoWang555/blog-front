<template>
  <v-layout column align-start justify-start>
    <v-flex xs12 sm8 md6>
      <ArticleHeader :data="articleData.list[0]"/>
    </v-flex>
  </v-layout>
</template>

<script>
import ArticleHeader from '@/components/ArticleHeader'
import { getList } from '@/api/article'

export default {
  name: 'Index',
  head() {
    return { title: `首页` }
  },
  async asyncData(context) {
    const { data: articleData } = await getList()
    return {
      articleData
    }
  },
  components: {
    ArticleHeader
  },
  data() {
    return {
      articleData: null
    }
  }
}
</script>
