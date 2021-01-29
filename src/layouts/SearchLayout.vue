<template>
  <a-layout :class="['search-layout', fixedSideBar ? 'fixed-side-bar' : '']">
    <!-- <drawer v-if="isMobile" v-model="collapsed">
      <side-menu :theme="theme.mode" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer> -->
    <!-- <side-menu :theme="theme.mode" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" /> -->
    <!-- <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'"/>
      </div>
      <setting />
    </drawer> -->
    <search-header :style="headerStyle" :menuData="menuData" @do-search="handleDoSearch" :collapsed="collapsed"
                   @toggleCollapse="toggleCollapse" :searching="searching"/>
    <a-layout class="search-layout-main beauty-scroll">
      <div style="overflow:scroll;">
        <slot v-if="showStructure" name="tree-view"></slot>
      </div>
      <a-layout-header v-if="fixedHeader"></a-layout-header>
      <a-layout-content class="search-layout-content">
        <div :style="`min-height: ${minHeight}px; position: relative`">
          <slot name="search-result"></slot>
        </div>
      </a-layout-content>

      <a-layout-sider v-if="!isMobile" v-model="collapsed" theme="light" collapsible>
        <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="1">
            <a-icon type="file-text"/>
            <span>Content List</span>
          </a-menu-item>
          <a-menu-item key="2" @click=onClickStructure>
            <a-icon type="gold"/>
            <span>Structure List</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="file"/>
            <span>Local Files</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="team"/>
            <span>My Groups</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout-sider v-else width="65px" theme="light">
        <a-menu mode="inline" theme="light" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <a-icon type="file-text"/>
          </a-menu-item>
          <a-menu-item key="2" @click=onClickStructure>
            <a-icon type="gold"/>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="file"/>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="team"/>
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="appstore"/>
          </a-menu-item>
          <a-menu-item key="6">
            <a-icon type="api"/>
          </a-menu-item>

        </a-menu>
      </a-layout-sider>

    </a-layout>
    <a-layout-footer style="padding: 0px">
      <page-footer :link-list="footerLinks" :copyright="copyright"/>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import SearchHeader from './header/SearchHeader'
import PageFooter from './footer/PageFooter'
// import Drawer from '../components/tool/Drawer'
// import SideMenu from '../components/menu/SideMenu'
// import Setting from '../components/setting/Setting'
import {mapState} from 'vuex'

const minHeight = window.innerHeight - 64 - 24 - 122

let menuData = []

export default {
  name: 'AdminLayout',
  components: {PageFooter, SearchHeader},
  // components: { Setting, SideMenu, Drawer, PageFooter, SearchHeader},
  props: ["searching"],
  data() {
    return {
      results: [],
      minHeight: minHeight,
      collapsed: false,
      menuData: menuData,
      showSetting: false,
      showStructure: false
    }
  },
  provide() {
    return {
      layoutMinHeight: minHeight,
      menuI18n: require('@/router/i18n').default
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'theme', 'layout', 'footerLinks', 'copyright', 'fixedHeader', 'fixedSideBar', 'hideSetting']),
    sideMenuWidth() {
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width = (this.fixedHeader && this.layout == 'side' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      let transition = this.fixedHeader ? 'transition: width 0.2s' : ''
      return `width: ${width}; position: ${position}; ${transition}`
    }
  },
  methods: {
    handleDoSearch(query) {
      this.$emit("do-search", query)
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    onMenuSelect() {
      this.toggleCollapse()
    },
    onClickStructure() {
      this.showStructure = !this.showStructure
    }
  },
  beforeCreate() {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style lang="less" scoped>
.search-layout {
  &.fixed-side-bar {
    height: 100vh;

    .search-layout-main {
      overflow: scroll;
    }
  }

  .search-layout-main {
    .search-header {
      top: 0;
      right: 0;
    }
  }

  .search-layout-content {
    //padding: 24px 24px 0;
    min-height: auto;
    background-color: white;
  }

  .setting {
    background-color: @primary-color;
    color: @base-bg-color;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px @shadow-color;
  }
}

.tree-view {
  position: relative;
  // width: 8%;
}
</style>
