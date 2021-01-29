<template>
  <admin-layout>
    <!--    <div class="tree-view" slot="tree-view">-->
    <!--      <a-tree-->
    <!--          class="tree-view"-->
    <!--          :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"-->
    <!--          :treeData="outline">-->
    <!--        &lt;!&ndash; @select="onSelect"> &ndash;&gt;-->
    <!--      </a-tree>-->
    <!--    </div>-->
    <!--    <drawer v-if="isMobile" v-model="collapsed">-->
    <!--      <side-menu :theme="theme.mode" :menuData="menuData" :collapsed="false" :collapsible="false"-->
    <!--                 @menuSelect="onMenuSelect"/>-->
    <!--    </drawer>-->
    <!--    <side-menu :theme="theme.mode" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed"-->
    <!--               :collapsible="true"/>-->
    <!--    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">-->
    <!--      <div class="setting" slot="handler">-->
    <!--        <a-icon :type="showSetting ? 'close' : 'setting'"/>-->
    <!--      </div>-->
    <!--      <setting/>-->
    <!--    </drawer>-->

    <div class="search-layout-content">
      <search-form class="search-form" :searching="searching" @do-search="handleSearch" @switch-dataset="switchDataset"
                   @filter-change="handleFilterChange"/>
      <search-list :search-title="searchTitle" :results="results" :level="0"/>
    </div>
  </admin-layout>
</template>

<script>
import SearchForm from '@/pages/list/search/SearchForm'
import AdminLayout from '@/layouts/AdminLayout'
import outline from './outline.json'
// import Drawer from '@/components/tool/Drawer'
// import SideMenu from '@/components/menu/SideMenu'
// import Setting from '@/components/setting/Setting'
import {mapState} from "vuex";
import SearchList from "./SearchList";
import {es} from '@/es.js';

const minHeight = window.innerHeight - 64 - 24 - 122
let menuData = [
  {
    path: 'discover',
    name: 'DISCOVER'
  },
  {
    path: 'connection',
    name: 'CONNECTION'
  }
]

export default {
  name: 'SearchResult',
  // components: {AdminLayout, SearchForm, Setting, SideMenu, Drawer},
  components: {SearchList, AdminLayout, SearchForm},
  data() {
    return {
      index: 'wos-metadata',
      minHeight: minHeight,
      collapsed: false,
      menuData: menuData,
      showSetting: false,
      showStructure: true,
      level1Filter: [],
      results: [],
      keyword: null,
      searching: false,
      outline: outline,
      loading: false,
      post: null,
      error: null,
      isHighlight: false,
      searchTitle: '',
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
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    handleFilterChange(level1Filter) {
      console.log('filter change', level1Filter)
      this.level1Filter = level1Filter
    },
    switchDataset() {
      if (this.index === 'wos-metadata') {
        this.index = 'news'
      } else {
        this.index = 'wos-metadata'
      }
      this.handleSearch(this.searchTitle)
    },
    handleSearch(query) {
      this.searchTitle = query
      let body = {
        size: 20,
        query: {
          match: {
            'Abstract': query
          }
        }
      }
      es.search({index: this.index, body: body})
          .then(results => {
            this.$store.state.setting.history.searchResultTitle = query
            this.results = results.hits.hits
            this.searching = false
          })
          .catch(err => {
            console.log(err)
            this.searching = false
          });
    },
    fetchData() {
      this.error = this.post = null
      this.loading = true
      console.log('fetch', this)
      // const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      // this.search.results = [{title: this.$route.query.keyword}];
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    onMenuSelect() {
      this.toggleCollapse()
    },
    onClickStructure() {
      this.showStructure = !this.showStructure
    },
  },
  mounted() {
    const query = this.$store.state.setting.history.searchResultTitle
    if (query) {
      this.handleSearch(query)
    }
  }
}
</script>

<style lang="less">
@import "index";

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
