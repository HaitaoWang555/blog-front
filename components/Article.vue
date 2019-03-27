<template>
  <div class="article">
    <div
      v-for="item in data"
      :key="item.id"
      class="my-4"
    >
      <ArticleHeader :data="item"/>
      <div class="markdown-body" v-html="item.content" v-highlight />
    </div>
  </div>
</template>

<script>
import ArticleHeader from '@/components/ArticleHeader'
import 'github-markdown-css/github-markdown.css'

export default {
  name: 'Articl',
  components: {
    ArticleHeader
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return null
      }
    }
  }
}
</script>
