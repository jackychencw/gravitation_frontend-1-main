const elasticsearch = require('elasticsearch');
export const es = new elasticsearch.Client({
    hosts: ['http://39.105.160.121:9200']
})

