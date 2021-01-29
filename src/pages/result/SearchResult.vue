<template>
  <search-layout>
      <div class="tree-view" slot="tree-view">
        <a-tree
        class="tree-view"
        :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
        :treeData="outline">
        <!-- @select="onSelect"> -->
        </a-tree>
      </div>
    <div class="search-layout-content" slot="search-result">
      <div class="search-result">
          <a-list
          item-layout="vertical" 
          size="large"
          :data-source="search.results">
            <a-list-item class="item" slot="renderItem" slot-scope="item, key">
              <template v-for="{ type, text } in actions" slot="actions">
                <span :key="type">
                  <a-icon :type="type" style="margin-right: 8px" />
                  {{ text }}
                </span>
              </template>
              <img
                slot="extra"
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
              <a-list-item-meta :ref="key" @mouseover="mouseOver(key)" @mouseleave="mouseLeave(key)" :description="item.description">
                <a slot="title" :href="item.href">{{ item.title }} - {{ item.author}}</a>
                <a-avatar slot="avatar" :src="item.avatar" />
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </a-list>
        </div>
      </div>
  </search-layout>
</template>

<script>
import SearchLayout from '@/layouts/SearchLayout'
import data from './fake-result.json'
import outline from './outline.json'
// import axios from 'axios'

export default {
  name: 'Home',
  components: {SearchLayout},
  props: ['result'],
  data(){
    return {
      keyword: null,
      searching: false,
      search: data,
      outline: outline,
      loading: false,
      post: null,
      error: null,
      isHighlight: false,
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.error = this.post = null
      this.loading = true
      // const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      // this.search.results = [{title: this.$route.query.keyword}];
    },
    mouseOver: function(id) {
      console.log(id);
      this.isHighlight = true
    },
    mouseLeave: function(id) {
      console.log(id);
      this.isHighlight = false
    }
  }
}
</script>

<style lang="less">
@import "index";
</style>
