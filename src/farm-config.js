const path = require('path');
const yaml = require('yamljs');

const defaults = {
  'priority': 0,
  'client-headers': ['*'],
  'virtual-hosts': ['*'],
  'renderers': [{
    'hostname': 'localhost',
    'port': 4503
  }],
  'filters': [{
    'type': 'allow',
    'glob': '*'
  }],
  'cache': {
    'rules': [{
      'type': 'deny',
      'glob': '*'
    }],
    'allowed-clients': [{
      'type': 'allow',
      'glob': '*'
    }],
    'invalidate': [{
      'type': 'allow',
      'glob': '*'
    }]
  }
};

function FarmConfig(options = {}) {
  if (!(this instanceof FarmConfig)) {
    return new FarmConfig(options);
  }
  if (options.path) {
    this.data = yaml.load(options.path);
    this.data.name = path.basename(options.path, '.yaml');
  } else if (options.config) {
    this.data = yaml.parse(options.config);
  } else if (options.data) {
    this.data = options.data;
  }
  this.data = {...defaults, ...this.data};
  this.validate();
  return this;
}

FarmConfig.prototype.validate = function() {
  if (this.data.cache['doc-root'] === undefined) {
    throw new Error('Configuration element \'cache.doc-root\' is mandatory');
  }
};

FarmConfig.prototype.property = function(key) {
  if (key === 'priority') {
    if (this.data.priority < 10) {
      return `0${this.data.priority}`;
    }
  }
  return this.data[key];
};

module.exports = FarmConfig;
