<template>
  <div class="comment py-2">
    <CommentList :article-id="articleId"/>
  </div>
</template>

<script>
import CommentList from './comment/comment-list'

export default {
  name: 'Comment',
  components: {
    CommentList
  },
  props: {
    articleId: {
      type: String,
      default: ''
    }
  }
}
</script>
