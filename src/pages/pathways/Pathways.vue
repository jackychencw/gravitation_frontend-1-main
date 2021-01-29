<template>
  <admin-layout>
    <!--    {{pathways}}-->
    <div :style="{ marginTop: '16px' }" align="right">
      <a-radio-group default-value="a" @change="onChange">
        <a-radio-button value="byTitle">
          By search title
        </a-radio-button>
        <a-radio-button value="byLabel">
          By labels
        </a-radio-button>
      </a-radio-group>
    </div>

    <div v-if="!byLabel">
      <div v-for="(pathway, title) in pathways" :key="title">
        <pathway :createTime="'create'" :searchTitle="title" :data="pathway"/>
      </div>
    </div>
    <div v-else>
      <div v-for="(pathway, title) in pathwaysTitle" :key="title">
        <pathway-label :createTime="'create'" :searchTitle="title" :data="pathway"/>
      </div>
    </div>

  </admin-layout>
</template>

<script>
// import CommonLayout from '@/layouts/CommonLayout'
// import BlankView from '@/layouts/BlankView'
import '@/mock'
import axios from 'axios'
import {EventBus} from '@/event-bus.js';
import AdminLayout from '@/layouts/AdminLayout'
import Pathway from '@/components/card/Pathway'
import PathwayLabel from '@/components/card/PathwayLabel'

export default {
  name: 'Pathways',
  // components: {BlankView },
  components: {
    AdminLayout,
    Pathway,
    PathwayLabel
  },
  data() {
    return {
      byLabel: false,
      logging: false,
      error: '',
    }
  },
  computed: {
    pathwaysTitle() {
      // return this.$store.state.searchTitle
      const pathways = {}
      for (const history of this.$store.state.searchTitle.searchTitles) {
        if (history.searchTitle === undefined) {
          continue
        }
        if (!(history.level1Tag in pathways)) {
          pathways[history.level1Tag] = []
        }
        pathways[history.level1Tag].push(history)
      }
      return pathways
    },
    pathways() {
      // return this.$store.state.searchTitle
      const pathways = {}
      for (const history of this.$store.state.searchTitle.searchTitles) {
        if (history.searchTitle === undefined) {
          continue
        }
        if (!(history.searchTitle in pathways)) {
          pathways[history.searchTitle] = []
        }
        pathways[history.searchTitle].push(history)
      }
      return pathways
    },
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    onChange(e) {
      this.byLabel = e.target.value === 'byLabel'
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          axios.post('/login', {
            name: this.form.getFieldValue('name'),
            password: this.form.getFieldValue('password')
          }).then((res) => {
            this.logging = false
            const result = res.data
            if (result.code >= 0) {
              const user = result.data.user
              this.$router.push('/search')
              EventBus.$emit('login-success')
              this.$store.commit('account/setUser', user)
              this.$message.success(result.message, 3)
            } else {
              this.error = result.message
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }

      .title {
        font-size: 33px;
        color: @title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }

    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }

  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }

    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
