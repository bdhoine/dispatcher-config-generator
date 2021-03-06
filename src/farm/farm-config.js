const extname = require('gulp-extname');

const Config = require('../config');
const defaults = require('./defaults');

class FarmConfig extends Config {
  constructor(options = {}) {
    super(options);
    this.data = {...defaults, ...this.data};
  }

  generate() {
    const priority = this.property('priority');
    const name = this.property('name');
    this.assemble.data(this.data);
    this.assemble.partials('src/templates/partials/*.hbs');
    return this.assemble.src('src/templates/dispatcher.inc')
        .pipe(this.assemble.renderFile('hbs'))
        .pipe(extname(`.${priority}-${name}.inc.any`))
        .pipe(this.assemble.dest(this.output));
  }

  property(key) {
    if (key === 'priority') {
      if (this.data.priority < 10) {
        return `0${this.data.priority}`;
      }
    }
    return `${this.data[key]}`;
  }
}

module.exports = FarmConfig;
