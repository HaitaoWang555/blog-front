<template>
  <v-app style="max-width: 1920px;">
    <Header></Header>
    <v-content class="mb-2">
      <v-container>
        <v-fade-transition mode="out-in">
          <v-layout row align-start justify-center>
            <v-flex xs12 sm8 md8>
              <nuxt></nuxt>
            </v-flex>
          </v-layout>
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
