<template>
  <!--  <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">-->
  <!--  <keep-alive :exclude="dustbins" v-if="multiPage">-->
  <!--    <router-view @login-popup-layout="handlePopup"/>-->
  <!--  </keep-alive>-->

  <div>
    <router-view/>
    <a-modal
        title="登陆"
        :visible="visible"
        :footer="null"
        @ok="handleOk"
        @cancel="handleCancel"
    okText="登陆"
    >
      <login/>
    </a-modal>
  </div>
  <!--  </page-toggle-transition>-->
</template>

<script>
// import PageToggleTransition from '../components/transition/PageToggleTransition';
import {mapState} from 'vuex'
// Import the EventBus.
import {EventBus} from '@/event-bus.js';
import Login from '@/pages/login/Login'


export default {
  name: 'BlankView',
  components: {Login},
  computed: {
    ...mapState('setting', ['multiPage', 'animate', 'dustbins'])
  },

  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      this.visible = false
      this.$router.push('/search')
    },
    handlePopup() {
      this.visible = true
      // this.$router.push('/login')
    },
  },
  mounted() {
    EventBus.$on('login-popup-header', this.handlePopup);
    EventBus.$on('login-success', () => this.visible = false);
  }
}
</script>

<style scoped>

</style>
