require('mocha');
const expect = require('chai').expect;

const DispatcherConfig = require('../../src/dispatcher/dispatcher-config');

describe('dispatcher config defaults', function() {
  let config;

  before(function() {
    config = new DispatcherConfig();
  });

  it('config folder should be \'conf\'', function() {
    expect(config.data['config']).to.equal('conf');
  });

  it('decline root should be \'Off\'', function() {
    expect(config.data['decline-root']).to.equal('Off');
  });

  it('keep alive timeout should be \'60\'', function() {
    expect(config.data['keep-alive-timeout']).to.equal(60);
  });

  it('log level should be \'warn\'', function() {
    expect(config.data['log-level']).to.equal('warn');
  });

  it('log path should be \'logs/dispatcher.log\'', function() {
    expect(config.data['log-path']).to.equal('logs/dispatcher.log');
  });

  it('name should be \'dispatcher\'', function() {
    expect(config.data['name']).to.equal('dispatcher');
  });

  it('no canon url should be \'Off\'', function() {
    expect(config.data['no-canon-url']).to.equal('Off');
  });

  it('pass error should be \'0\'', function() {
    expect(config.data['pass-error']).to.equal(0);
  });

  it('ssi no cache should be \'Off\'', function() {
    expect(config.data['ssi-no-cache']).to.equal('Off');
  });

  it('use processed url should be \'On\'', function() {
    expect(config.data['use-processed-url']).to.equal('On');
  });
});
