module.exports = {
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
