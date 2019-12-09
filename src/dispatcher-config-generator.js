#!/usr/bin/env node

const assemble = require('assemble');
const async = require('async');
const extname = require('gulp-extname');
const glob = require('glob');
const yaml = require('yamljs');

const farm = require('./farm-config');

const app = assemble();

function generateDispatcherConfig(options) {
  app.data(yaml.load(`${options.config}/dispatcher/config.yaml`));
  app.src('src/templates/dispatcher.{conf,any}')
      .pipe(app.renderFile('hbs'))
      .pipe(app.dest('output'));
}

function generateFarmConfig(options) {
  glob(`${options.config}/farms/*.yaml`, function(_, files) {
    async.each(files, function(configPath, next) {
      const config = farm({path: configPath});
      const priority = config.property('priority');
      const name = config.property('name');
      app.data(config.data);
      app.src('src/templates/dispatcher.inc')
          .pipe(app.renderFile('hbs'))
          .pipe(extname(`.${priority}-${name}.inc.any`))
          .pipe(app.dest(options.output));
      next();
    });
  });
}

function generate(options) {
  generateDispatcherConfig(options);
  generateFarmConfig(options);
}

module.exports = generate;
