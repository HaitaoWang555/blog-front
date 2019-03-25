<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div style="height: 1958px;" class="text-xs-center">首页</div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    tagData() {
      return this.$store.state.tag.data
    }
  }
}
</script>
