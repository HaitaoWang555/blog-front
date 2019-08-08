<template>
  <div class="comment-list">
    <v-list three-line>
      <template v-for="(item, index) in items">

        <v-list-tile
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="item.userInfo.icon">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <span>{{ item.userInfo.username }}<span class="px-2">说</span></span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <comment-reply v-if="item.level" :article-id="articleId" :p_id="item.id" :key="'reply' + index" />
        
        <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>

      </template>
    </v-list>
  </div>
</template>

<script>
import CommentReply from './comment-reply'

export default {
  name: 'CommentList',
  components: {
    CommentReply
  },
  props: {
    articleId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      items: []
    }
  },
  created() {
    if (this.articleId) {
      this.init()
    }
  },
  methods: {
    async init() {
      const params = {}
      params.id = this.articleId
      const data = await this.$axios.$get('/comment/list', { params })
      if (data && !data.statusCode) {
        this.initData(data)
      }
    },
    initData(data) {
      this.items = data
    }
  }
}
</script>
