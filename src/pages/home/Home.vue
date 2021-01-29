<template>
  <admin-layout>
    <div :class="['admin-layout-content', 'search']">
        <h1 id="intro">
        Facing the boundary of ourselves initially,<br>
        then building a real better future
        </h1>
        <div id="search-bar">
          <a-input-search v-if="!searching" placeholder="input some keywords or a sentence"  @search="onSearch" />
          <a-input-search v-if="searching" loading />
        </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout'

export default {
  name: 'Home',
  components: {AdminLayout},
  data(){
    return {
      searching: false,
      search_result: null
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onSearch(value) {
      if (value) {
        this.searching=true;
        this.sleep(100).then(() => {
          console.log("hello");
          this.searching=false;
          this.$router.push('/search?keyword=' + value)
        })
      }
    },
    search(value){
      console.log(value);
    }
  }
}
</script>

<style lang="less">
@import "index";
</style>
