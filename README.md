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
 