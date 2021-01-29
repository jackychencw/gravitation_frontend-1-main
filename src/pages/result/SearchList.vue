<template>
  <div class="search-result">
    <a-list
        item-layout="vertical"
        size="large"
        :data-source="docs">
      <a-list-item class="item" slot="renderItem" slot-scope="item, key">
        <template v-for="{ type, text } in actions" slot="actions">
                <span :key="type">
                  <a-icon :type='"star-o"' style="margin-right: 8px"/>
                  {{ text }}
                </span>
        </template>
        <img
            slot="extra"
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        <a-list-item-meta :ref="key" @mouseover="mouseOver" @mouseleave="mouseLeave"
                          :description="item.text.substring(0, 200) + '...'">
          <a slot="title"
             :href="'#/article?docId='+item.id+'&searchTitle='+searchTitle+'&level='+(parseInt(level)+1)+'&index='">
            <!--          <a slot="title" @click="() => {openInNewTab(item.id)}">-->
            <!--          <a slot="title">-->
            {{ item.domain }}-{{ item.area }}{{ item.text.substring(0, 10) }}...
            <!--            <router-link :to="{ name: '#/article?docId='+item.id}" target="_blank">-->
            <!--              {{ item.domain }}-{{ item.area }}{{ item.text.substring(0, 10) }}...-->
            <!--            </router-link>-->
          </a>
          <a-avatar slot="avatar" :src="item.area"/>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  name: 'search-list',
  props: {
    results: {},
    searchTitle: {},
    level: (x) => !isNaN(parseInt(x)) ? parseInt(x) : 0,
  },
  computed: {
    docs() {
      let docs = []
      for (let i = 0; i < this.results.length; i++) {
        const id = this.results[i]._id
        const {Domain, area, Abstract} = this.results[i]._source
        docs.push({
          id: id,
          domain: Domain,
          area: area,
          text: Abstract,
        })
      }
      return docs
    },
  },
  methods: {
    mounted() {
      console.log('mounted')
    },
    onClick(e) {
      console.log('e', e)
      // this.$router.push('article?docId='+item.id)
    },
    mouseOver: function () {
      console.log('mouseOver', this.searchTitle)
      this.isHighlight = true
    },
    mouseLeave: function () {
      this.isHighlight = false
    },
  },
  data() {
    return {
      actions: [
        {type: 'star-o', text: '156'},
        {type: 'like-o', text: '156'},
        {type: 'message', text: '2'},
      ],
    }
  }

}
</script>
<style lang="less">
@import "index";

</style>