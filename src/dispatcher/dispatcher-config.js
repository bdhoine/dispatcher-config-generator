const Config = require('../config');
const defaults = require('./defaults');

class DispatcherConfig extends Config {
  constructor(options) {
    super(options);
    this.data = {...defaults, ...this.data};
    this.validate();
  }

  generate() {
    this.assemble.data(this.data);
    return this.assemble.src('src/templates/dispatcher.{conf,any}')
        .pipe(this.assemble.renderFile('hbs'))
        .pipe(this.assemble.dest(this.output));
  }

  validate() {
    this.validateLogLevel();
  }

  validateLogLevel() {
    const logLevel = this.data['log-level'];
    if (typeof logLevel == 'number') {
      if (logLevel < 0 || logLevel > 3) {
        throw new Error('Dispatcher log level should be a number from 0 to 3');
      }
    } else {
      throw new Error('Dispatcher log level should be numeric');
    }
  }
}

module.exports = DispatcherConfig;
