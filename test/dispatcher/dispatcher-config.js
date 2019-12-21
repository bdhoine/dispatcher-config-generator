require('mocha');
const expect = require('chai').expect;

const DispatcherConfig = require('../../src/dispatcher/dispatcher-config');
const defaults = require('../../src/dispatcher/defaults');

describe('dispatcher config', function() {
  it('data is default when no config is set', function() {
    const config = new DispatcherConfig({});
    expect(config.data).to.deep.equal(defaults);
  });

  it('should parse yaml config strings', function() {
    const config = new DispatcherConfig({
      config: `
        config: conf
        decline-root: Off
        keep-alive-timeout: 60
        log-level: warn
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
});
