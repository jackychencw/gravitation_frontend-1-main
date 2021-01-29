# GRAVITATION

## Install Packages
```bash
$ npm install
```
## Run
```bash
$ npm run serve
```

## Build Docker 
```bash
$ docker build --target=production-stage -t jackychencw/gravitation-production:latest .
```

## Push Docker
```bash
$ docker push jackychencw/gravitation-production:latest
```

## Pull Docker image
```bash
$ docker pull jackychencw/gravitation-production:latest
```

## Run Docker Instance
```bash
$ docker run -d -it -p 80:80 --rm  jackychencw/gravitation-production:latest
```
 
## Elastic Search
```bash
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e http.cors.enabled=true -e http.cors.allow-origin='*' -v /usr/share/elasticsearch/data docker.elastic.co/elasticsearch/elasticsearch:7.10.1
```
Download the web-of-science dataset from https://data.mendeley.com/datasets/9rw3vkcfy4/6
Then run import wos.py to create the es index.

