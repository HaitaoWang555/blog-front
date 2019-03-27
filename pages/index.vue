<template>
    <Article :data="articleData.list"/>
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
