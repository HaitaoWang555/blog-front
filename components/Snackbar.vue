<template>
    <v-snackbar
      v-model="snackbarObj.snackbar"
      :color="snackbarObj.color"
      top
    >
      {{ snackbarObj.tips }}
    </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    ...mapGetters([
      'snackbarObj'
    ])
  },
  watch: {
    snackbarObj: {
      deep: true,
      handler(val) {
        if (val.snackbar) {
          const timer = setTimeout(() => {
            this.close()
            clearTimeout(timer)
          }, 2000)
        }
      }
    }
  },
  methods: {
    close() {
      this.$store.commit('SET_SNACKBAR', null)
    }
  }
}
</script>
