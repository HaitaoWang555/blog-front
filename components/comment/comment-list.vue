<template>
  <div>
    <div v-if="items.length > 0">
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
                <span class="title">
                  {{ item.userInfo.userName }}
                  <span class="px-2">说</span>
                  <span class="px-2">{{ item.created | time('{y}-{m}-{d} {h}:{i}') }}</span>
                </span>
              </v-list-tile-title>
              <v-list-tile-sub-title class="content" v-html="item.content"></v-list-tile-sub-title>
              <CommentBtn :item="item" class="wrapBtn" :setNewList="setNewReplayList" />
            </v-list-tile-content>
          </v-list-tile>

          <comment-reply v-if="item.isHaveLeaf" :article-id="articleId" :p_id="item.id" :key="'reply' + index" />
          
          <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>

        </template>
      </v-list>
      <w-pagination :pageObj="pageObj" :changePage="init" :element="'.comment'" />
    </div>
    <CommentForm :article-id="articleId" @setNewList="setNewList"/>
  </div>
</template>

<script>
import WPagination from '~/components/w-pagination.vue'
import CommentReply from './comment-reply'
import CommentBtn from './comment-btn'
import CommentForm from './comment-form'

export default {
  name: 'CommentList',
  components: {
    WPagination, CommentReply, CommentBtn, CommentForm
  },
  props: {
    articleId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      items: [],
      pageObj: {
        page: 1,
        pageSize: 10,
        total: null
      }
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
      params.articleId = this.articleId
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
    setNewReplayList(data) {
      const id = data.parent_id
      for (let i = 0; i < this.items.length; i++) {
        const element = this.items[i]
        if (element.id === id) element.isHaveLeaf = true
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
