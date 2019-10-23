<template>
  <div class="comment-form">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-layout row align-end justify-center>
          <v-flex xs10>
            <v-textarea
              v-model="comment"
              name="comment"
              :label="labelText"
              hint="文明发言"
              required
              :rules="commentRules"
              :counter="80"
            ></v-textarea>
          </v-flex>
          <v-flex xs2 class="text-xs-center">
            <v-btn
              v-if="item && item.userId"
              color="error"
              @click="close"
            >
              关闭
            </v-btn>    
            <v-btn
              :disabled="!Boolean(loggedUser)"
              :loading="loading"
              color="primary"
              @click="submit"
            >
              提交
            </v-btn>    
          </v-flex>
        </v-layout>
      </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/store'

export default {
  name: 'CommentForm',
  props: {
    articleId: {
      type: [String, Number],
      default: ''
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    close: {
      type: Function,
      default: null
    }
  },
  computed: {
    labelText() {
      if (this.item.userInfo) {
        return this.item.userInfo.userName ? '您正在回复 ' + this.item.userInfo.userName : '评论'
      } else if (!this.loggedUser) {
        return '请先登录'
      } else {
        return '评论'
      }
    },
    ...mapGetters([
      'loggedUser'
    ])
  },
  data() {
    return {
      comment: null,
      loading: false,
      commentRules: [
        v => !!v || '请填写评论',
        v => (v && v.length < 81) || '评论长度不能超过80'
      ],
      valid: true
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const form = {}
        if (!this.loggedUser) {
          this.showTips('error', '请先登录')
          return
        }
        this.loading = true
        form.user_id = this.loggedUser.id
        form.content = this.comment
        form.article_id = this.articleId
        if (this.item && this.item.userId) {
          form.reply_user_id = this.item.userId
          form.parent_id = this.item.parentId || this.item.id
        }
        const data = await this.$axios.$post('/comment/add', form)
        this.loading = false
        if (data.success !== false) {
          this.showTips('success', '评论成功')
          this.setNewList(data)
          if (this.item && this.item.userId) this.close()
        } else {
          this.showTips('error', data.msg || '评论失败')
          removeToken()
          location.reload()
        }
      }
    },
    showTips(color, tips) {
      const obj = {}
      obj.snackbar = true
      obj.tips = tips
      obj.color = color
      this.$store.commit('SET_SNACKBAR', obj)
    },
    setNewList(data) {
      if (this.item.id) {
        data.replyUserInfo = this.item.userInfo
      }
      this.$emit('setNewList', data)
    }
  }
}
</script>
