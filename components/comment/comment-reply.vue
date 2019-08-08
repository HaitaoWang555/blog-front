<template>
  <div class="comment-reply">
    <v-list three-line class="grey lighten-5 mx-5">
      <template v-for="(item, index) in items">

        <v-list-tile
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="item.p_id">{{ item.name }}<span class="px-2">回复</span>{{ item.replyName }}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>

      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'CommentReply',
  props: {
    articleId: {
      type: String,
      default: ''
    },
    p_id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      items: [
        {
          id: 'c79df6ef-3819-4693-9e1b-495a7184da43',
          p_id: 'c79df6ef-3819-4693-9e1b-495a7184da03',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: 'Oui',
          replyName: 'Brunch',
          subtitle: 'Do you have Paris recommendations? Have you ever been?'
        }
      ]
    }
  }
}
</script>
