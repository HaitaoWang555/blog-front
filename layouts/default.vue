<template>
  <v-app>
    <Header></Header>
    <v-content>
      <v-container>
        <v-fade-transition mode="out-in">
          <nuxt></nuxt>
        </v-fade-transition>
      </v-container>
    </v-content>
    <ScrollTop></ScrollTop>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ScrollTop from '~/components/ScrollTop.vue'

export default {
  components: {
    Header,
    Footer,
    ScrollTop
  }
}
</script>
