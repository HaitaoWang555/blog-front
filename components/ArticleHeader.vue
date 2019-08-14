<template>
  <div v-if="data" class="articleHeader">
    <div class="display-1 font-weight-medium">
      <nuxt-link :to="{ path: '/article/'+data.id }">{{data.title}}</nuxt-link>
    </div>
    <v-layout wrap align-start justify-start class="pa-2">
      <span class="px-2 pointer" @click="clickTag(data.category, 'category')">
        <v-icon>folder</v-icon>
        {{ data.category }}
      </span>
      <span class="px-2">
        <v-icon>date_range</v-icon>
        {{ data.update_content_time | time('{y}-{m}-{d}') }}
      </span>
      <span class="px-2">
        <v-icon>visibility</v-icon>
        {{ data.hits || 0 }}
      </span>
      <span class="px-2">
        <v-icon>mode_comment</v-icon>
        {{ data.comment_count || 0 }}
      </span>
    </v-layout>
    <v-layout v-if="data.tags" align-start justify-start row wrap="true">
      <v-chip
        v-for="(item, index) in data.tags"
        :key="index"
        small
        outline
        color="primary"
        class="pointer px-3"
        @click="clickTag(item)"
      >
        <span class="pointer">{{ item }}</span>
      </v-chip>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ArticleHeader',
  props: {
    data: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  methods: {
    clickTag(item, type) {
      if (type === 'category') {
        this.$router.push({ path: '/category/' + item })
      } else {
        this.$router.push({ path: '/tag/' + item })
      }
    }
  }
}
</script>
