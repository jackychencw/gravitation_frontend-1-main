<template>
  <a-layout-header :class="[headerTheme, 'button-header']">
    <div :class="['button-header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', headerTheme]">
        <img id="logoimg" width="50" src="@/assets/img/logo.svg" />
        <h1 id="logotitle" v-if="!isMobile">{{systemName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
      <div :class="['button-header-right', headerTheme]">
          <i-menu class="head-menu" style="height: 64px; line-height: 64px;box-shadow: none"
                  @i18nComplete="setRoutesI18n" :i18n="menuI18n" :theme="headerTheme" mode="horizontal"
                  :options="menuData" @click="onClick" @select="onSelect" v-on:open-change="openChange"/>
          <a-dropdown class="lang header-item">
            <div>
              <a-icon type="global"/> {{langAlias}}
            </div>
            <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
              <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
            </a-menu>
          </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
// import HeaderSearch from './HeaderSearch'
// import HeaderNotice from './HeaderNotice'
// import HeaderAvatar from './HeaderlAvatar'
import IMenu from '@/components/menu/menu'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'ButtonHeader',
  components: {IMenu},
  // components: {IMenu, HeaderAvatar, HeaderNotice},
  props: ['collapsed', 'menuData'],
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
    headerTheme () {
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
    toggleCollapse () {
      console.log('tc')
      this.$emit('toggleCollapse')
    },
    onSelect (obj) {
      console.log('select', obj)
      this.$emit('menuSelect', obj)
    },
    onClick (obj) {
      console.log('click', obj)
    },
    openChange (obj) {
      obj
      // if(obj[0] === '/login') {
      //   this.$router.push('/login')
      // }
    },
    ...mapMutations('setting', ['setLang', 'setRoutesI18n'])
  }
}
</script>

<style lang="less" scoped>
@import "index";
</style>
