<template>
  <div class="w-pagination">
    <v-layout row align-center justify-center>
      <v-flex v-if="pageObj.total" xs1 sm1 md1 class="text-xs-left">
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

export default {
  name: 'WPagination',
  props: {
    changePage: {
      type: Function,
      defalut: null
    },
    element: {
      type: String,
      default: 'html'
    },
    pageObj: {
      type: Object,
      defalut: () => {
        return {
          page: 1,
          pageSize: 15,
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
      return this.pageObj.total ? Math.ceil(this.pageObj.total / this.pageObj.pageSize) : 0
    }
  },
  mounted() {
    this.btnNum = window.innerWidth > 720 ? 7 : 4
  },
  methods: {
    goChange() {
      const page = this.pageObj.page
      if (this.totalPage < page || page < 1) {
        this.pageObj.page = this.savePage
        return
      }
      this.$vuetify.goTo('html')
      this.savePage = this.pageObj.page
      this.changePage()
    }
  }
}
</script>
