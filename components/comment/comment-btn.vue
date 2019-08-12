<template>
  <div>
    <v-layout wrap align-center justify-center class="pa-2 wrap">
      <div class="pa-2 icon"><v-icon>thumb_up</v-icon> <span>{{ item.up }}</span></div>
      <div class="pa-2 icon"><v-icon>thumb_down</v-icon> <span>{{ item.down }}</span></div>
      <div class="pa-2"><v-btn @click.stop="replay">回复</v-btn></div>
    </v-layout>
   <v-dialog
      v-model="dialog"
      persistent
      max-width="750"
    >
      <CommentForm
        v-if="dialog"
        :item="item"
        :article-id="item.article_id"
        :close="closeDialog" 
        style="padding: 20px;background-color: white"
        @setNewList="setNewList"
      />
   </v-dialog>
  </div>
</template>

<script>
import CommentForm from './comment-form'

export default {
  name: 'CommentBtn',
  components: {
    CommentForm
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setNewList: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    replay() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.wrap > div.icon {
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
