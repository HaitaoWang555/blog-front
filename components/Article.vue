<template>
  <div class="article">
    <div
      v-for="(item, index) in data"
      :key="item.id"
      class="my-4">
      <ArticleHeader :data="item"></ArticleHeader>
      <template v-if="!model || model.type !== 'details'">
        <div class="markdown-body" v-highlight >
          {{ item.content }}
        </div>
        <v-btn color="primary" @click="clickTag(item.id)">
          阅读全文
        </v-btn>
        <v-divider v-if="index + 1 < data.length" :key="'divider' + item.id"></v-divider>
      </template>
      <template v-else>
        <div class="markdown-body" v-html="item.content" v-highlight >
        </div>
      </template>
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
    },
    model: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  methods: {
    clickTag(id) {
      this.$router.push({ path: '/article/' + id })
    }
  }
}
</script>
