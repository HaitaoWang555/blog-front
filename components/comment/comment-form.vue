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
              v-if="item && item.user_id"
              color="error"
              @click="close"
            >
              关闭
            </v-btn>    
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              @click="submit"
            >
              提交
            </v-btn>    
          </v-flex>
        </v-layout>
      </v-form>
      <Snackbar :snackbar-obj="snackbarObj"/>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar'

export default {
  name: 'CommentForm',
  components: { Snackbar },
  props: {
    articleId: {
      type: String,
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
        return this.item.userInfo.username ? '您正在回复 ' + this.item.userInfo.username : '评论'
      } else {
        return '评论'
      }
    }
  },
  data() {
    return {
      comment: null,
      loading: false,
      commentRules: [
        v => !!v || '请填写评论',
        v => (v && v.length < 81) || '评论长度不能超过80'
      ],
      valid: true,
      snackbarObj: {
        snackbar: false,
        color: '',
        tips: ''
      }
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const form = {}
        if (!this.$store.state.user) {
          this.showTips('error', '请先登录')
          return
        }
        this.loading = true
        form.user_id = this.$store.state.user.id
        form.content = this.comment
        form.article_id = this.articleId
        if (this.item && this.item.user_id) {
          form.reply_user_id = this.item.user_id
          form.parent_id = this.item.parent_id || this.item.id
        }
        const data = await this.$axios.$post('/comment/addone', form)
        this.loading = false
        if (data && !data.statusCode) {
          this.showTips('success', '评论成功')
          this.setNewList(data)
          if (this.item && this.item.user_id) this.close()
        } else {
          this.showTips('error', data.message || '评论失败')
        }
      }
    },
    showTips(color, tips) {
      this.snackbarObj.snackbar = true
      this.snackbarObj.tips = tips
      this.snackbarObj.color = color
    },
    setNewList(data) {
      if (this.item.id) {
        data.replyUserInfo = this.item.replyUserInfo
      }
      this.$emit('setNewList', data)
    }
  }
}
</script>
