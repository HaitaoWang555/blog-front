<template>
  <div style="height: 1958px;" class="text-xs-center">
    <v-layout align-start justify-start row wrap="true">
      <v-chip
        v-for="(item, index) in tagData"
        :key="index"
        :color="item.color || 'primary'"
        :text-color="item.textColor || 'white'"
        style="padding: 0 10px;"
        :class="{'elevation-8': item.name === activeTag, 'pointer': true}"
        @click="clickTag(item)"
      >
        <span class="pointer">{{ item.name }}</span>
      </v-chip>
    </v-layout>
      <TagContent :content="articles" :title="activeTag"/>
  </div>
</template>

<script>
import TagContent from './components/tagContent'
import { getList } from '@/api/tag'

export default {
  name: 'Tag',
  head() {
    return { title: `标签页` }
  },
  async asyncData(context) {
    const { data: tagData } = await getList()
    return {
      tagData,
      articles: tagData[0].articles,
      activeTag: tagData[0].name
    }
  },
  components: {
    TagContent
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
