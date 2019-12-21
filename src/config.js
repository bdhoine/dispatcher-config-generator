const assemble = require('assemble');
const path = require('path');
const yaml = require('yamljs');

class Config {
  constructor(options = {}) {
    if (options.path) {
      this.data = yaml.load(options.path);
      this.data.name = path.basename(options.path, '.yaml');
    } else if (options.config) {
      this.data = yaml.parse(options.config);
    } else if (options.data) {
      this.data = options.data;
    }
    if (!options.output) {
      options.output = 'output';
    }
    this.options = options;
    this.assemble = assemble();
  }
}

module.exports = Config;
