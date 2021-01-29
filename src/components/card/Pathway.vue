<template>
  <div style="padding: 0px 100px">
<!--    data: {{data}}-->
    searchTitle: {{searchTitle}}
    create time: {{ createTime }}
    <h1>{{ searchTitle }}</h1>
    <a-list bordered :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item" :style="{ 'padding-left': item.level*25+'px' }">
        <a :href="'#/article?docId=' + item.id">{{ item.text }}</a>
      </a-list-item>
    </a-list>
    Promoted by <u>Martine</u>
    <br/>
    <div align="right">
      <u><a @click="viewRecommendation">view recommendations</a></u>
    </div>

    <div class="recommendations" :style="'display: ' + (showRecommendation ? 'block' : 'none')">
      create time: {{ createTime }}
      <h1>{{ searchTitle }}</h1>
      <a-list bordered :data-source="recommendationsModel">
        <a-list-item slot="renderItem" slot-scope="item" :style="{ 'padding-left': item.level*25+'px' }">
          <a :href="'#/article?docId=' + item.id">{{ item.title }}</a>
        </a-list-item>
      </a-list>
      Promoted by <u>Martine</u>
    </div>

    <hr/>
  </div>
</template>

<script>
import {es} from '@/es.js';

export default {
  name: 'Pathway',
  props: ['data', 'searchTitle', 'createTime'],
  data() {
    return {
      showRecommendation: false,
      recommendations: []
    }
  },
  computed: {
    recommendationsModel() {
      let models = []
      for (let path of this.recommendations) {
        let level = 0
        for (let r of path) {
          level++
          console.log('r', r)
          let source = r._source
          models.push({
            id: r._id,
            title: source.Domain + '-' + source.area + '-' + source.Abstract.substring(0, 10) + '...',
            level: level
          })
        }
      }
      return models
    }
  },
  methods: {
    viewRecommendation() {
      this.showRecommendation = true

      for (let i = 0; i < this.data.length && i < 3; i++) {
        let body = {
          size: 3,
          query: {
            match: {
              'Abstract': this.data[i].text
            }
          }
        }
        es.search({index: 'wos-metadata', body: body})
            .then(results => {
              this.recommendations = []
              this.recommendations.push(results.hits.hits)
              console.log('recommended', this.recommendations)
            })
            .catch(err => {
              err
            });

      }
    }
  }
}
</script>

<style scoped lang="less">
.chart-card-header {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.chart-card-header .meta {
  position: relative;
  overflow: hidden;
  width: 100%;
  color: @text-color-second;
  font-size: 14px;
  line-height: 22px;
}

.chart-card-action {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.total {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
}

.chart-card-footer {
  border-top: 1px solid @border-color-base;
  padding-top: 9px;
  margin-top: 8px;
}

.chart-card-content {
  margin-bottom: 12px;
  position: relative;
  height: 46px;
  width: 100%;
}

.chart-card-content .content-fix {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
