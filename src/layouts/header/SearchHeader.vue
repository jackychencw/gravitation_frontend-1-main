<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', headerTheme]">
        <img id="logoimg" width="50" src="@/assets/img/logo.svg"/>
        <h1 id="logotitle" v-if="!isMobile">{{ systemName }}</h1>
      </router-link>
      <div id="search">
        <header-search class="header-item" @do-search="handleDoSearch" :searching="searching"/>
      </div>

      <a-divider v-if="isMobile" type="vertical"/>
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="toggleCollapse"/>
      <div v-if="!isMobile" :class="['admin-header-right', headerTheme]">
        <a-dropdown class="lang header-item">
          <div>
            <a-icon type="global"/>
            {{ langAlias }}
          </div>
          <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
            <a-menu-item v-for=" lang in langList" :key="lang.key">{{ lang.key.toLowerCase() + ' ' + lang.name }}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderSearch from './HeaderSearch'
// import HeaderNotice from './HeaderNotice'
// import HeaderAvatar from './HeaderlAvatar'
// import IMenu from '@/components/menu/menu'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'SearchHeader',
  components: {HeaderSearch},
  // components: {IMenu, HeaderAvatar, HeaderNotice},
  props: ['collapsed', 'menuData', 'searching'],
  inject: ['menuI18n'],
  data() {
    return {
      langList: [
        {key: 'CN', name: '简体中文', alias: '简体'},
        {key: 'HK', name: '繁體中文', alias: '繁體'},
        {key: 'US', name: 'English', alias: 'English'}
      ]
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'isMobile', 'layout', 'systemName', 'lang']),
    headerTheme() {
      if (this.layout == 'side' && this.theme.mode == 'dark' && !this.isMobile) {
        return 'light'
      }
      return this.theme.mode
    },
    langAlias() {
      let lang = this.langList.find(item => item.key == this.lang)
      return lang.alias
    }
  },
  methods: {
    handleDoSearch(query) {
      this.$emit("do-search", query)
    },
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    ...mapMutations('setting', ['setLang', 'setRoutesI18n'])
  }
}
</script>

<style lang="less" scoped>
@import "index";
</style>
