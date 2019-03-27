<template>
  <v-layout column align-center justify-start>
    <v-flex xs12 sm8 md6>
      <Article :data="articleData.list"/>
    </v-flex>
  </v-layout>
</template>

<script>
import Article from '@/components/Article'
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
    Article
  },
  data() {
    return {
      articleData: null
    }
  }
}
</script>
