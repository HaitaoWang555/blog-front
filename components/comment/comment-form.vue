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
              hint="支持markdown语法"
              required
              :rules="commentRules"
              :counter="996"
            ></v-textarea>
          </v-flex>
          <v-flex xs2 class="text-xs-center">
            <v-btn
              v-if="replyUserId"
              color="error"
              @click="close"
            >
              关闭
            </v-btn>    
            <v-btn
              :disabled="!valid"
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
    replyUserId: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    close: {
      type: Function,
      default: null
    }
  },
  computed: {
    labelText() {
      return this.label ? '您正在回复 ' + this.label : '评论'
    }
  },
  data() {
    return {
      comment: null,
      commentRules: [
        v => !!v || '请填写评论',
        v => (v && v.length < 996) || '评论长度不能超过996'
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
        form.user_id = this.$store.state.user.id
        form.content = this.comment
        form.article_id = this.articleId
        if (this.replyUserId) {
          form.reply_user_id = this.replyUserId
          form.level = this.level + 1
        }
        const data = await this.$axios.$post('/comment/addone', form)
        if (data && !data.statusCode) {
          this.showTips('success', '评论成功')
          if (this.replyUserId) this.close()
        } else {
          this.showTips('error', data.message || '评论失败')
        }
      }
    },
    showTips(color, tips) {
      this.snackbarObj.snackbar = true
      this.snackbarObj.tips = tips
      this.snackbarObj.color = color
    }
  }
}
</script>
