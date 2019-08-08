<template>
    <v-snackbar
      v-model="snackbarObj.snackbar"
      :color="snackbarObj.color"
      :timeout="Number('4000')"
      top
    >
      {{ snackbarObj.tips }}
    </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    snackbarObj: {
      type: Object,
      default: () => {
        return {
          snackbar: false,
          color: '',
          tips: ''
        }
      }
    }
  }
}
</script>
