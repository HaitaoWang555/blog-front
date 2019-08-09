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

          <v-list-tile-content class="comment-content">
            <v-list-tile-title>
              <span>{{ item.userInfo.username }}<span class="px-2">说</span></span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
            <CommentBtn :item="item" class="wrapBtn" />
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
import CommentBtn from './comment-btn'

export default {
  name: 'CommentList',
  components: {
    CommentReply, CommentBtn
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
<style scoped>
.comment-content {
  position: relative;
}
.wrapBtn {
  position: absolute;
  right: 0;
  display: none;
}
.comment-content:hover .wrapBtn {
  display: flex;
}
</style>
