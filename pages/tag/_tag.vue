<template>
  <div class="text-xs-center">
    <v-layout align-start justify-start row wrap="true">
      <v-chip
        v-for="(item, index) in tagData"
        :key="index"
        :color="item.color || 'primary'"
        :text-color="item.textColor || 'white'"
        :class="{'elevation-8': item.name === activeTag, 'pointer': true, 'px-3': true}"
        @click="clickTag(item)"
      >
        <v-badge
          color="cyan"
          right
        >
          <template v-slot:badge>
            <span>{{ item.articles.length }}</span>
          </template>
          <span class="pointer">{{ item.name }}</span>
        </v-badge>
      </v-chip>
    </v-layout>
      <Content :content="articles" :title="activeTag"/>
  </div>
</template>

<script>
import Content from '@/components/content'

export default {
  name: 'Tag',
  head() {
    return { title: `标签` }
  },
  async asyncData(context) {
    const { tag } = context.params
    const tagData = await context.app.$axios.$get('/tag/list')
    let item = tag ? tagData.find(i => i.name === tag) : tagData[0]
    if (!item) item = { name: '未知标签', articles: null }
    return {
      tagData,
      articles: item.articles,
      activeTag: item.name
    }
  },
  components: {
    Content
  },
  data() {
    return {
      tagData: null,
      articles: null,
      activeTag: null
    }
  },
  methods: {
    clickTag(item) {
      this.activeTag = item.name
      this.articles = item.articles
    }
  }
}
</script>
