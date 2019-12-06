const assemble = require('assemble');
const async = require('async');
const extname = require('gulp-extname');
const glob = require('glob');
const yaml = require('yamljs');

const farm = require('./src/farm-config.js');

const app = assemble();

app.task('dispatcher', function() {
  app.data(yaml.load('config/dispatcher/config.yaml'));
  return app.src('src/templates/dispatcher.{conf,any}')
      .pipe(app.renderFile('hbs'))
      .pipe(app.dest('output'));
});

app.task('farms', function(cb) {
  glob('config/farms/*.yaml', function(_, files) {
    async.each(files, function(configPath, next) {
      const config = farm({path: configPath});
      const priority = config.property('priority');
      const name = config.property('name');
      app.data(config.data);
      app.src('src/templates/dispatcher.inc')
          .pipe(app.renderFile('hbs'))
          .pipe(extname(`.${priority}-${name}.inc.any`))
          .pipe(app.dest('output'));
      next();
    }, cb);
  });
});

app.task('default', ['dispatcher', 'farms']);

module.exports = app;
