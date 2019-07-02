<template>
  <div class="header">
    <v-toolbar app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <img style="width: 40px;height: 40px;" src="/v.png" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in links" :key="item.path" flat nuxt :to="item.path">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
      <v-menu left bottom offset-y >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            v-on="on"
            style="width: 64px;height: 64px;"
          >
            <v-avatar size="48px" tile>
              <img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
              >
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <template 
            v-for="(item, index) in items"
          >
            <v-list-tile :key="'list' + index">
              <v-list-tile-title style="min-width: 120px;text-align: center;cursor: pointer;">
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="'divider' + index"></v-divider>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img style="width: 40px;height: 40px;" src="/v.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in links"
          :key="item.path"
          nuxt
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon style="margin-top: -2px;">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      title: 'Bolg',
      links: [
        { path: '/', name: '首页', icon: 'home' },
        { path: '/category', name: '分类', icon: 'category' },
        { path: '/tag', name: '标签', icon: 'label' },
        { path: '/archive', name: '归档', icon: 'archive' },
        { path: '/about', name: '关于', icon: 'question_answer' }
      ],
      items: [
        { title: '登录', type: 'login' },
        { title: '退出', type: 'logout' }
      ],
      drawer: null
    }
  }
}
</script>
