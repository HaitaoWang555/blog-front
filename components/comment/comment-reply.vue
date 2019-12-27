<template>
  <div class="comment-reply">
    <v-list class="grey lighten-5 mx-5">
      <template v-for="(item, index) in items">

        <v-list-tile
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar>
            <img v-avatar="item.userInfo.userName" class="user-avatar">
          </v-list-tile-avatar>

          <v-list-tile-content class="comment-content">
            <v-list-tile-title>
              <span class="title">{{ item.userInfo.userName }}<span class="px-2">回复</span>{{ item.replyUserInfo.userName }}<span class="px-2">{{ item.created | time('{y}-{m}-{d} {h}:{i}') }}</span></span>
            </v-list-tile-title>
            <v-list-tile-sub-title class="content" @click="showAll(item)">{{ item.content }}</v-list-tile-sub-title>
            <CommentBtn :item="item" class="wrapBtn" :setNewList="setNewList" />
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>

      </template>
      <div v-if="this.pageObj.total > this.pageObj.page * this.pageObj.pageSize" class="ml-4" @click="getMore"><v-btn flat small color="primary">查看更多</v-btn></div>
    </v-list>
    <v-dialog v-if="dialogItem" v-model="dialog" scrollable max-width="80%">
      <v-card>
        <v-card-title>
          <span class="title">{{ dialogItem.userInfo.userName }}<span class="px-2">回复</span>{{ dialogItem.replyUserInfo.userName }}<span class="px-2">{{ dialogItem.created | time('{y}-{m}-{d} {h}:{i}') }}</span></span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          {{ dialogItem.content }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="justify-content: flex-end;">
          <v-btn color="blue darken-1" flat @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>      
  </div>
</template>

<script>
import CommentBtn from './comment-btn'

export default {
  name: 'CommentReply',
  components: { CommentBtn },
  props: {
    articleId: {
      type: [String, Number],
      default: ''
    },
    p_id: {
      type: [String, Number],
      default: null
    }
  },
  mounted() {
    this.init()
  },
  data() {
    return {
      items: [],
      pageObj: {
        page: 1,
        pageSize: 4,
        total: null
      },
      dialogItem: null,
      dialog: false
    }
  },
  methods: {
    async init() {
      const params = {}
      params.articleId = this.articleId
      params.parentId = this.p_id
      params.page = this.pageObj.page
      params.pageSize = this.pageObj.pageSize
      const data = await this.$axios.$get('/comment/list', { params })
      if (data) {
        this.initData(data)
      }
    },
    initData(data) {
      this.items = data.items
      this.pageObj.total = data.total
    },
    setNewList(data) {
      const userInfo = {}
      userInfo.icon = this.$store.state.user.icon
      userInfo.userName = this.$store.state.user.username
      data.userInfo = userInfo
      this.items.push(data)
    },
    getMore() {
      this.pageObj.pageSize += 4
      this.init()
    },
    showAll(val) {
      if (val && val.content.length > 50) {
        this.dialogItem = val
        this.dialog = true
      }
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
.title {
  font-size: 14px!important;
  color: rgba(0,0,0,0.54)!important;
}
.content {
  font-size: 16px!important;
  color: rgba(0,0,0,0.87)!important;
}
</style>
