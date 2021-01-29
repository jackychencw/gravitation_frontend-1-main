<template>
  <admin-layout>
    <!--    <div :class="['admin-layout-content', 'search']">-->
    <!--      <h1 id="intro">-->
    <!--        Facing the boundary of ourselves initially,<br>-->
    <!--        then building a real better future-->
    <!--      </h1>-->
    <!--      <div id="search-bar">-->
    <!--        <a-input-search v-if="!searching" placeholder="input some keywords or a sentence" @search="onSearch"/>-->
    <!--        <a-input-search v-if="searching" loading/>-->
    <!--      </div>-->


    <div class="titles" align="left">
      <h1 style="font-size: 30px">
        A high-quality search tool for logical self-consistency
      </h1>
      <h2 class="subtitle">
        Investigate the things and extend to the utmost the knowledge
      </h2>
      <a-button class="button-margin" type="primary" @click="search">START FREE</a-button>
      <a-button class="button-margin" type="secondary">WATCH VIDEO</a-button>
    </div>


    <div align="center">
      <br/>
      <img style="padding-top: 20px" alt="welcome" width="60%" src="@/assets/img/welcome.png"/>
      <br/>
      <br/>
      <p style="font-weight: bolder">Are you interested in us?</p>
      <p>Then give us a e-mail and we'll check it and chat through what you need. We've got tea, coffee and
        biscuits.</p>
      <p style="font-weight: bold">zhirongzhang0503@gmail.com</p>
    </div>
    <!--    </div>-->
  </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout'

export default {
  name: 'Home',
  components: {AdminLayout},
  data() {
    return {
      visible: false,
      searching: false,
      search_result: null
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onSearch() {
      this.$router.push('/login')
    },
    search(value) {
      console.log(value);
    }
  }
}
</script>

<style lang="less">
@import "index";
.button-margin {
  margin-right: 20px
}

.titles {
  padding-left: 15%;
}

.subtitle {
  font-size: 20px;
  font-weight: lighter;
}
</style>
