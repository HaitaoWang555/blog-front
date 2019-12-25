<template>
    <v-navigation-drawer
      permanent
      fixed
      style="width: 300px"
    >
      <v-divider></v-divider>

      <v-treeview
        :items="items"
        :active.sync="active"
        :open.sync="open"
        active-class="primary--text"
        item-children="articles"
        item-key="key"
        open-on-click
        activatable
        hoverable
      ></v-treeview>
    </v-navigation-drawer>
</template>
<script>

export default {
  data() {
    return {
      items: [],
      open: [],
      active: [],
      activeId: null
    }
  },
  created() {
    this.init()
  },
  watch: {
    active: {
      deep: true,
      handler(val) {
        if (val) {
          this.clickItem()
        }
      }
    }
  },
  methods: {
    async init() {
      const SidebarList = await this.$axios.$get('/category/list')
      const index = SidebarList.findIndex(i => i.articles.length > 0)
      if (index < 0) return
      SidebarList[index].open = true
      this.items = SidebarList.map((i) => {
        const obj = i
        obj.key = 'p' + obj.id
        if (obj.open) this.open.push(obj.key)
        obj.articles = obj.articles.map((item, index) => {
          item.name = item.title
          item.key = 'c' + item.id
          if (obj.open && index === 0) {
            this.active.push(item.key)
          }
          return item
        })
        return obj
      })
    },
    clickItem() {
      const id = this.active[0] || null
      if (!id && this.activeId) {
        this.activeId = null
        return
      }
      if (id !== this.activeId) {
        this.activeId = id
        const articleId = Number(this.activeId.slice(1))
        this.$store.commit('SET_SIDEBAR_ID', articleId)
      }
    }
  }
}
</script>