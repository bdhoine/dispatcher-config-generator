const Config = require('../config');
const defaults = require('./defaults');

class DispatcherConfig extends Config {
  constructor(options) {
    super(options);
    this.data = {...defaults, ...this.data};
  }

  generate() {
    this.assemble.data(this.data);
    return this.assemble.src('src/templates/dispatcher.{conf,any}')
        .pipe(this.assemble.renderFile('hbs'))
        .pipe(this.assemble.dest(this.options.output));
  }
}

module.exports = DispatcherConfig;
