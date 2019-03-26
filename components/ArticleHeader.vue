<template>
  <div v-if="data" class="articleHeader">
    <div class="headline">{{ data.title }}</div>
    <v-layout align-start justify-start class="mb-2">
      <span class="group pa-2">
        <span class="mr-2">
          <v-icon>folder</v-icon>
          {{ data.category }}
        </span>
        <span class="mx-2">
          <v-icon>date_range</v-icon>
          {{ data.created | time('yyyy-MM-dd') }}
        </span>
        <span class="mx-2">
          <v-icon>visibility</v-icon>
          {{ data.hits }}
        </span>
        <span class="mx-2">
          <v-icon>mode_comment</v-icon>
          {{ data.commentCount }}
        </span>
      </span>
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
  }
}
</script>
