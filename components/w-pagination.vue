<template>
  <div class="w-pagination">
    <v-layout row align-center justify-center>
      <v-flex class="text-xs-center">
        <v-pagination
          v-model="pageObj.page"
          :length="pageObj.totalPage"
          :total-visible="btnNum"
          @input="changePage"
        ></v-pagination>
      </v-flex>
      <v-flex xs1 sm1 md1 class="text-xs-center">
        <v-text-field
          v-model.number="pageIndex"
          type="number"
          @change="jumper"
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
    pageObj: {
      type: Object,
      defalut: () => {
        return {
          page: 1,
          totalPage: 1
        }
      }
    }
  },
  data() {
    return {
      pageIndex: 1,
      btnNum: 7
    }
  },
  mounted() {
    this.pageIndex = this.pageObj.page
    this.btnNum = window.innerWidth > 720 ? 7 : 4
  },
  watch: {
    pageObj: {
      deep: true,
      handler(val) {
        this.pageIndex = val.page
        this.$vuetify.goTo('html')
      }
    }
  },
  methods: {
    jumper() {
      if (this.pageIndex > 0) {
        this.pageObj.page = Math.ceil(this.pageIndex)
        this.changePage()
        this.$vuetify.goTo('html')
      } else {
        this.pageIndex = this.pageObj.page
      }
    }
  }
}
</script>
