'use strict';

var async = require('async');
var browserify = require('browserify');
var fs = require('fs');
var mkdirp = require('mkdirp');
var mold = require('mold-source-map');
var path = require('path');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

async.series([
  function(callback) {
    [
      'site.js'
    ].forEach(function(name) {
      console.log("Packaging JS for " + name);
      mkdirp.sync('assets/app/js/');
      var outName = name.replace(/\.jsx$/, '.js').replace(/\.js/, '.js');
      browserify({extensions: ['.jsx']})
      .require(path.join(__dirname, 'app', 'bundles', name), {
        entry: true,
        basedir: path.join(__dirname, 'app')
      })
      .transform('reactify')
      .transform('envify')
      .transform('brfs')
      .transform('uglifyify')
      .bundle({debug: true})
      .pipe(mold.transformSourcesRelativeTo(path.join(__dirname, 'app')))
      .pipe(fs.createWriteStream(path.join('assets/app/js/', outName), 'w'))
      .on('end', function () {
        callback();
      });
    });
  },

], function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
