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
              name="comment"
              label="评论"
              hint="支持markdown语法"
              required
              :value="comment"
              :rules="commentRules"
              :counter="996"
            ></v-textarea>
          </v-flex>
          <v-flex xs2 class="text-xs-center">
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
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
  data() {
    return {
      comment: null,
      commentRules: [
        v => !!v || '请填写评论',
        v => (v && v.length < 996) || '评论长度不能超过996'
      ],
      valid: true
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.comment)
      }
    }
  }
}
</script>
