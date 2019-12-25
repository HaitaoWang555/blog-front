<template>
  <v-app style="max-width: 1920px;">
    <Sidebar />
    <v-content class="mb-2" style="margin-left: 300px">
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
    <Footer style="margin-left: 300px"></Footer>
  </v-app>
</template>

<script>
import Footer from '~/components/notes/Footer.vue'
import Sidebar from '~/components/notes/Sidebar.vue'
import ScrollTop from '~/components/ScrollTop.vue'

export default {
  components: {
    Sidebar, Footer, ScrollTop
  }
}
</script>
