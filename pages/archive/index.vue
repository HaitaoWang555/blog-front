<template>
  <div class="archive">
    <v-timeline>
      <v-timeline-item
        v-for="(item, i) in archive.items"
        :key="i"
        :color="item.color || 'primary'"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${item.color || 'primary'}--text`"
            v-text="item.dateStr"
          ></span>
        </template>
        <div v-for="article in item.article" :key="article.id" class="py-2 text-xs-center">
          <div>
            <span class="text--secondary">
              {{ article.updatedAt | time('{m}-{d}') }}
            </span>            
            <nuxt-link :to="{ path: '/article/'+article.id }" style="width: 100%">
              {{ article.title }}
            </nuxt-link>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>

export default {
  name: 'Archive',
  head() {
    return { title: `归档` }
  },
  async asyncData(context) {
    const archive = await context.app.$axios.$get('/archive/list')
    return {
      archive
    }
  },
  data() {
    return {
      archive: null
    }
  }
}
</script>
