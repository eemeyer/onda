# Local build instructions


## Install software

```
bundle install
```

## development mode building
```
./lint.sh && node deploy.js &&  bundle exec jekyll serve --verbose --config _config.yml,_config_local.yml
```

## Build the JS

```
./lint.sh && NODE_ENV=production node deploy.js
```

## optimise the images

```
./node_modules/.bin/grunt default
```
