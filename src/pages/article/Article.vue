<template>
  <tabs-view class="tabs">
    <div class="detail">
      <div>
        <h1>
          Domain: {{ this.doc._source.Domain }}
        </h1>
      </div>

      <div>
        <h2>
          Area: {{ this.doc._source.area }}
        </h2>
      </div>

      <div>
        <h3>
          Keywords: {{ this.doc._source.keywords }}
        </h3>
      </div>

      <div>
        Abstract: {{ this.doc._source.Abstract }}
      </div>

      <hr/>

      <div>
        <h1>
          Related articles
        </h1>
        <search-list class="list" :results="results" :search-title="searchTitle" :level="level"/>
      </div>
    </div>
  </tabs-view>
</template>

<script>
import TabsView from '@/layouts/TabsView'
import '@/mock'
import SearchList from '@/pages/result/SearchList'
import {es} from '@/es.js';
import PouchDB from "pouchdb";

let db = new PouchDB('adminDb')

export default {
  name: 'Article',
  components: {
    SearchList,
    TabsView
  },
  beforeRouteUpdate(to, from, next) {
    this.update()
    next()
  },
  data() {
    return {
      retry: 0,
      doc: {
        _source: {}
      },
      results: {},
      index: 'woc-metadata',
    }
  },
  computed: {
    level() {
      return this.$route.query.level
    },
    searchTitle() {
      return this.$route.query.searchTitle
    },
    id() {
      return this.$route.query.docId
    },
    // index() {
    //   // return this.$route.query.index
    //   // return this.$route.query.index
    // }
  },
  mounted() {
    const history = this.$store.state.setting.history.article
    if (!this.$route.query.docId) {
      if (history) {
        for (let x of Object.keys(history)) {
          this.$route.query[x] = history[x]
        }
      }
    } else {
      this.$store.state.setting.history.article = this.$route.query
    }
    this.update()
  },
  methods: {
    switchSource() {
      if (this.index === 'wos-metadata') {
        this.index = 'news'
      } else {
        this.index = 'wos-metadata'
      }
    },
    update() {
      es.get({
        id: this.id,
        index: this.index
      }).then(doc => {
            this.retry = 0
            this.doc = doc

            const text = doc._source.Domain + ' ' + doc._source.area
            const searchTitle = this.searchTitle
            const level = this.level
            this.$store.commit('searchTitle/setSearchTitles', {
              id: this.id,
              searchTitle: searchTitle,
              text: text,
              level: level,
              level1Tag: doc._source.Domain
            })
            console.log('store', this.$store.state.searchTitle)

            let body = {
              size: 20,
              query: {
                match: {
                  'Abstract': text
                }
              }
            }
            es.search({index: this.index, body: body})
                .then(results => {
                  console.log('results', results)
                  this.results = results.hits.hits
                })
                .catch(err => {
                  console.log('switch article source')
                  err
                });
            if (this.index === 'news') {
              this.switchSource()
            }
          }
      ).catch(() => {
        this.retry += 1
        if (this.retry === 3) {
          return
        }
        this.switchSource()
        this.update()
        this.retry += 1
      })

      db
    }
  },
}
</script>

<style lang="less" scoped>
.detail {
  width: 72%;
  margin: 0 auto;
  padding-top: 50px;
}

.list {

}

</style>
