<template>
  <div class="comment-reply">
    <v-list three-line class="grey lighten-5 mx-5">
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
              <span>{{ item.userInfo.username }}<span class="px-2">回复</span>{{ item.replyUserInfo.username }}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
            <CommentBtn :item="item" class="wrapBtn" :setNewList="setNewList" />
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>

      </template>
    </v-list>
  </div>
</template>

<script>
import CommentBtn from './comment-btn'

export default {
  name: 'CommentReply',
  components: { CommentBtn },
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
  created() {
    this.init()
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    async init() {
      const params = {}
      params.id = this.articleId
      params.p_id = this.p_id
      const data = await this.$axios.$get('/comment/list', { params })
      if (data && !data.statusCode) {
        this.initData(data)
      }
    },
    initData(data) {
      this.items = data
    },
    setNewList() {
      this.init()
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
