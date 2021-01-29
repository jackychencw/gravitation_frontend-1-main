<template>
  <button-header-layout>
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
      <p>Then give us a e-mail and we'll check it and chat through what you need. We've got tea, coffee and biscuits.</p>
      <p style="font-weight: bold">zhirongzhang0503@gmail.com</p>
    </div>
    <router-view/>
  </button-header-layout>
</template>

<script>
// import CommonLayout from "@/layouts/CommonLayout";
// import AdminLayout from '@/layouts/AdminLayout'
import ButtonHeaderLayout from '@/layouts/ButtonHeaderLayout'
// import HomeLayout from '@/layouts/HomeLayout'
// import TabsView from '@/layouts/TabsView'
// import BlankView from '@/layouts/BlankView'

export default {
  name: 'Welcome',
  // components: {CommonLayout},
  // components: {AdminLayout},
  components: {ButtonHeaderLayout},
  // components: {HomeLayout},
  // components: {TabsView},
  // components: {BlankView},
  data() {
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
        this.searching = true;
        this.sleep(100).then(() => {
          this.searching = false;
          this.$router.push('/search?keyword=' + value)
        })
      }
    },
    search() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
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

//.admin-layout-content{
//  //@media screen and (max-width: 900px) {
//  //  #intro {
//  //    display: none !important;
//  //  }
//  //}
//  //#intro{
//  //  position: absolute;
//  //  margin-bottom: 2%;
//  //  width: 50%;
//  //  height: 17%;
//  //  left: 8%;
//  //  top: 15%;
//  //
//  //  font-family: Open Sans;
//  //  font-style: normal;
//  //  font-weight: bold;
//  //  font-size: 30px;
//  //  line-height: 160%;
//  //  /* or 160% */
//  //  color: #222B45;
//  //}
//  #search-bar{
//    position: absolute;
//    width: 50%;
//    // float:top;
//    left: 8%;
//    top: 35%;
//
//    /* 1) Basic: Fill/02) 200 */
//
//    background: #F7F9FC;
//    border-radius: 4px;
//  }
//  #search-bar-top{
//    position: fixed;
//    width: 50%;
//    // float:top;
//    left: 8%;
//    top: 10%;
//
//    /* 1) Basic: Fill/02) 200 */
//
//    background: #F7F9FC;
//    border-radius: 4px;
//  }
//}

</style>
