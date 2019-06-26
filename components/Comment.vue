<template>
  <div class="comment">
      <div class="comment-header">
        <span class="total">{{total}}条评论</span>
        <span class="line"></span>
      </div>
      <CommentList />
      <CommentForm />
  </div>
</template>

<script>
import CommentForm from './comment/comment-form'
import CommentList from './comment/comment-list'

export default {
  name: 'Comment',
  components: {
    CommentForm, CommentList
  },
  data() {
    return {
      total: 0
    }
  },
  methods: {

  }
}
</script>
<style scoped>
  .comment-header {
    position: relative;
    display: flex;
    padding: 16px 0;
    align-items: center;
    justify-content: space-between;
  }

  .comment-header .total {
    position: relative;
    padding-right: 15px;
    color: #24292e;
    background: #fff;
    font-weight: 500;
    z-index: 1;
  }

  .comment-header .line {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    color: #eee;
    background: currentColor;
  }

</style>
