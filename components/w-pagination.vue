<template>
  <div class="w-pagination">
    <v-layout row align-center justify-center>
      <v-flex xs1 sm1 md1 class="text-xs-left">
        <v-btn small>共{{ pageObj.total }}条</v-btn>
      </v-flex>
      <v-flex class="text-xs-center">
        <v-pagination
          v-model="pageObj.page"
          :length="totalPage"
          :total-visible="btnNum"
          @input="goChange"
        ></v-pagination>
      </v-flex>
      <v-flex xs1 sm1 md1 class="text-xs-center">
        <v-text-field
          v-model.number="pageObj.page"
          type="number"
          @change="goChange"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const PAGE_SIZE = 15

export default {
  name: 'WPagination',
  props: {
    changePage: {
      type: Function,
      defalut: null
    },
    pageObj: {
      type: Object,
      defalut: () => {
        return {
          page: 1,
          total: 1
        }
      }
    }
  },
  data() {
    return {
      btnNum: 7,
      savePage: 1
    }
  },
  computed: {
    totalPage() {
      return this.pageObj.total ? Math.ceil(this.pageObj.total / PAGE_SIZE) : 0
    }
  },
  mounted() {
    this.btnNum = window.innerWidth > 720 ? 7 : 4
  },
  methods: {
    goChange() {
      const page = this.pageObj.page
      if (this.totalPage < page || page < 0) {
        this.pageObj.page = this.savePage
        return
      }
      this.savePage = this.pageObj.page
      this.changePage()
      this.$vuetify.goTo('html')
    }
  }
}
</script>
