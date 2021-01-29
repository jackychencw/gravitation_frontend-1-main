<template>
  <div class="header-search">
    <a-input-search v-if="!searching"
                    placeholder="input search text"
                    :class="['search-input', 'enter']"
                    :default-value="searchHistory"
                    @search="onSearch"/>
    <a-input-search v-else
                    placeholder="input search text"
                    :class="['search-input', 'enter']"
                    loading
    />
    <a-button shape="circle" id="refresh" @click="onSwitchDataset">
      <a-icon type="sync"/>
    </a-button>
  </div>
</template>

<script>


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export default {
  name: 'HeaderSearch',
  // components: {SearchResult},
  props: ['searching'],
  data() {
    return {
      dataSource: ['What is Search Intent?'],
    }
  },
  computed: {
    searchHistory() {
      if (this.$store.state.setting.history.searchTerm) {
        return this.$store.state.setting.history.searchTerm
      } else {
        return ''
      }
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onSearch(query) {
      this.$store.state.setting.history.searchTerm = query
      this.$emit("do-search", query)
    },
    onSwitchDataset() {
      this.$emit("switch-dataset")
    }
  }
}
</script>

<style lang="less">
.header-search {
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 10px;
  background-color: #f2f2f6;
  //background-image: linear-gradient(to bottom right, #3161ff, #b6a8ff);
  //background-image: url("http://localhost:8080/static/img/8831610211534_.pic_hd.jpg");
  width: 100%;

  .search-icon {
    font-size: 16px;
    cursor: pointer;
  }

  .search-input {
    border: 0;
    border-bottom: 1px solid @border-color-split;
    transition: width 0.3s ease-in-out;

    input {
      font-size: 18px;
      border: 0;
      box-shadow: 0 0 0 0;
    }

    width: 95%;
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

  #refresh {
    margin-left: 5px;
  }
}
</style>
