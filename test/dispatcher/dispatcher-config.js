require('mocha');
const expect = require('chai').expect;

const DispatcherConfig = require('../../src/dispatcher/dispatcher-config');
const defaults = require('../../src/dispatcher/defaults');

describe('dispatcher config', function() {
  let config;

  before(function() {
    config = new DispatcherConfig();
  });

  it('data is default when no config is set', function() {
    expect(config.data).to.deep.equal(defaults);
  });

  it('output folder is set to \'output\' when empty', function() {
    expect(config.output).to.equal('output');
  });

  it('should parse yaml config files and set name', function() {
    config = new DispatcherConfig({
      path: './test/dispatcher/config.yaml'
    });
    expect(config.data).to.deep.equal({...defaults, name: 'config'});
  });

  it('should parse yaml config strings', function() {
    config = new DispatcherConfig({
      config: `
        config: conf
        decline-root: Off
        keep-alive-timeout: 60
        log-level: 3
        log-path: logs/dispatcher.log
        name: dispatcher
        no-canon-url: Off
        pass-error: 0
        ssi-no-cache: Off
        use-processed-url: On
      `
    });
    expect(config.data).to.deep.equal(defaults);
  });

  it('should throw error on log level string values', function() {
    config = function() {
      new DispatcherConfig({
        data: {
          'log-level': '0'
        }
      });
    };
    expect(config).to.throw('Dispatcher log level should be numeric');
  });

  it('should throw error on log level < 0', function() {
    config = function() {
      new DispatcherConfig({
        data: {
          'log-level': -1
        }
      });
    };
    expect(config).to.throw('Dispatcher log level should be a number from 0 to 3');
  });

  it('should throw error on log level > 3', function() {
    config = function() {
      new DispatcherConfig({
        data: {
          'log-level': 4
        }
      });
    };
    expect(config).to.throw('Dispatcher log level should be a number from 0 to 3');
  });
});
