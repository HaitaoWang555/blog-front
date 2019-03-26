<template>
  <div class="content elevation-8 mt-4">
      <v-list subheader>
        <v-subheader class="headline">{{ title }}</v-subheader>
        <v-slide-x-reverse-transition v-if="content && content.length > 0"  group mode="in-out">
          <template
            v-for="(item, index) in content"
          >
            <v-list-tile v-ripple :key="item.id">
              <nuxt-link :to="{ path: '/article/'+item.id }" style="width: 100%">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span>{{ item.title }}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
              </nuxt-link>
            </v-list-tile>

            <v-divider v-if="index + 1 < content.length" :key="'divider' + item.id"></v-divider>
          </template>
        </v-slide-x-reverse-transition>
      </v-list>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    content: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
