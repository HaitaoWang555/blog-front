<template>
  <div style="height: 1958px;" class="text-xs-center">
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
            <span>{{ item.count }}</span>
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
import { getList } from '@/api/category'

export default {
  name: 'Category',
  head() {
    return { title: `分类` }
  },
  async asyncData(context) {
    const { category } = context.params
    const { data: tagData } = await getList()
    let item = category ? tagData.find(i => i.name === category) : tagData[0]
    if (!item) item = { name: '未知分类', articles: null }
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
