<template>
  <v-fab-transition>
    <v-btn
      v-show="!hidden"
      ref="scrollTop"
      fixed
      bottom
      right
      fab
      color="primary"
      @click="$vuetify.goTo(target, options)"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
import * as easings from 'vuetify/es5/components/Vuetify/goTo/easing-patterns'

export default {
  name: 'ScrollTop',
  data() {
    return {
      hidden: true,
      duration: 1000,
      offset: 0,
      easing: 'easeInOutQuart',
      easings: Object.keys(easings)
    }
  },
  computed: {
    target() {
      return 'html'
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    }
  },
  mounted() {
    // 顶部图标的显示与隐藏
    const _this = this
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 200) {
        _this.hidden = false
      } else {
        _this.hidden = true
      }
    }
  }
}
</script>
