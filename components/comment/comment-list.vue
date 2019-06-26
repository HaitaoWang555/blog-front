<template>
  <div class="comment-list">
    <v-list three-line>
      <template v-for="(item, index) in items">

        <v-list-tile
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <span>{{ item.name }}<span class="px-2">说</span></span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <comment-reply v-if="item.level" :p_id="item.id" :key="'reply' + index" />
        
        <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>

      </template>
    </v-list>
  </div>
</template>

<script>
import CommentReply from './comment-reply'

export default {
  name: 'CommentList',
  components: {
    CommentReply
  },
  data() {
    return {
      items: [
        {
          id: 'c79df6ef-3819-4693-9e1b-495a7184da03',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: 'Brunch',
          level: 1,
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          id: 'c79df6ef-3819-4693-9e1b-495a7184da23',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: 'Summer',
          level: 0,
          subtitle: "Wish I could come, but I'm out of town this weekend."
        },
        {
          id: 'c79df6ef-3819-4693-9e1b-495a7184da41',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          name: 'Birthday',
          level: 0,
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?'
        },
        {
          id: 'c79df6ef-3819-4693-9e1b-495a7184da42',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          name: 'Recipe',
          level: 0,
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
        }
      ]
    }
  }
}
</script>
