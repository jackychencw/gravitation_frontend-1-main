<template>
  <div class="header-search">
    <a-input-search v-if="!searching"
      placeholder="input search text" 
      :class="['search-input', 'enter']"
      @search="onSearch" />
    <a-input-search v-else
      placeholder="input search text" 
      :class="['search-input', 'enter']"
      loading
      />
    <a-button shape="circle" id="refresh" @click="onRefresh">
      <a-icon type="sync" />
    </a-button>
  </div>
</template>

<script>
// import SearchResult from "@/components/search-result/SearchResult"
import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export default {
  name: 'HeaderSearch',
  // components: {SearchResult},
  data () {
    return {
      search: {
        results: [
          { title: 'first article' },
          { title: 'second article' }
          ]
      },
      dataSource: ['What is Search Intent?'],
      searching: false
    }
  },
  methods:{
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onSearch(value){
      this.searching = true;
      axios
        .get(`http://localhost:9200/_search?q=${value}&pretty=true`)
        .then(response => {
          console.log(response)
          this.searching = true
        })
    },
    onRefresh(){
      console.log("refreshing")
    }
  }
}
</script>

<style lang="less">
  .header-search{
    .search-icon{
      font-size: 16px;
      cursor: pointer;
    }
    .search-input{
      border: 0;
      border-bottom: 1px solid @border-color-split;
      transition: width 0.3s ease-in-out;
      input{
        border: 0;
        box-shadow: 0 0 0 0;
      }
      width: 60%;
      // &.leave{
      //   width: 0px;
      //   input{
      //     display: none;
      //   }
      // }
      // &.enter{
      //   width: 400px;
      //   input:focus{
      //     box-shadow: 0 0 0 0;
      //   }
      // }
    }
  }
</style>
